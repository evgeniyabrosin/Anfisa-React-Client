import { IRangeSliderAxis } from './range-slider.interface'

const MIN_TICK_SPACE = 30

type RangeSliderLinearAxisParams = {
  min: number
  max: number
  step: number
  size: number
  isHistogramPoints: boolean
}

export class RangeSliderLinearAxis implements IRangeSliderAxis {
  public readonly ticks: number[]

  private readonly step: number
  private readonly min: number
  private readonly max: number
  private readonly k: number
  private readonly padding: number

  private readonly alignValue: (value: number) => number

  constructor({
    step,
    min,
    max,
    size,
    isHistogramPoints,
  }: RangeSliderLinearAxisParams) {
    this.step = step
    this.min = min
    this.max = max
    this.padding = isHistogramPoints ? size / (max - min + 1) / 2 : 0
    this.k = (max - min) / (size - this.padding * 2)

    this.ticks = this.calcTicks()

    if (this.step < 1) {
      const invertedStep = Math.round(1 / step)

      this.alignValue = value => Math.round(value * invertedStep) / invertedStep
    } else {
      this.alignValue = value => Math.round(value / step) * step
    }
  }

  getOffset(value: number): number {
    return (
      (clampValue(value, this.min, this.max) - this.min) / this.k + this.padding
    )
  }

  getValue(offset: number): number {
    return this.alignValue(
      clampValue(
        this.min + (offset - this.padding) * this.k,
        this.min,
        this.max,
      ),
    )
  }

  private calcTicks(): number[] {
    const ticks: number[] = [this.min]
    /**
     * detects max avail tick step
     * with linear scale it should be rounded log10 of difference between max and min
     * e.g.
     * 1) `min=10`, `max=50`  => `tickStep=10`,
     *     and in first approach we have ticks: 10, 20, 30, 40, 50
     * 2) `min=10`, `max=500` => `tickStep=100`, ticks: 10, 100, 200, 300, 400, 500
     */
    let tickStep = Math.max(
      Math.pow(10, Math.ceil(Math.log10(this.max - this.min)) - 1),
      this.step,
    )
    let divider = 2
    let candidateStep = Math.max(tickStep / divider, this.step)

    /**
     * but in the next step we try to reduce out tick step
     * until we reach a good distance between ticks (MIN_TICK_SPACE)
     */
    while (
      candidateStep > this.step &&
      this.getOffset(this.min + candidateStep) > MIN_TICK_SPACE
    ) {
      candidateStep = tickStep / divider
      tickStep = candidateStep
      divider = divider === 2 ? 5 : 2
    }

    let value = Math.floor((this.min + tickStep) / tickStep) * tickStep

    while (value < this.max) {
      ticks.push(value)
      value += tickStep
    }

    ticks.push(this.max)

    return ticks
  }
}

type RangeSliderLogAxisParams = {
  min: number
  max: number
  size: number
  fakeZero: number | undefined
}

export class RangeSliderLogAxis implements IRangeSliderAxis {
  public readonly ticks: number[]

  private readonly min: number
  private readonly max: number
  private readonly k: number
  private readonly ticksLog: number[]
  private readonly isFakeZero: boolean

  constructor({ min, max, size, fakeZero = 0.1 }: RangeSliderLogAxisParams) {
    this.isFakeZero = min === 0
    this.min = min === 0 ? fakeZero : min
    this.max = max
    this.k = Math.log10(max / this.min) / size
    this.ticks = this.calculateTicks()
    this.ticksLog = this.ticks.map(value =>
      Math.log10(value > 0 ? value : fakeZero),
    )
  }

  getOffset(value: number): number {
    if (value <= this.min && this.isFakeZero) {
      return 0
    }

    return Math.log10(clampValue(value, this.min, this.max) / this.min) / this.k
  }

  getValue(offset: number): number {
    return this.alignValue(
      clampValue(
        this.min * Math.pow(10, Math.max(offset, 0) * this.k),
        this.min,
        this.max,
      ),
    )
  }

  private alignValue(value: number): number {
    // align value to the nearest tick
    const valueLog = Math.log10(value)
    let leftIndex = 0
    let rightIndex = this.ticks.length - 1

    while (rightIndex - leftIndex > 1) {
      const index = Math.floor((leftIndex + rightIndex) / 2)
      const candidate = this.ticksLog[index]

      if (candidate > valueLog) {
        rightIndex = index
      } else {
        leftIndex = index
      }
    }

    return this.ticksLog[rightIndex] - valueLog <
      valueLog - this.ticksLog[leftIndex]
      ? this.ticks[rightIndex]
      : this.ticks[leftIndex]
  }

  private calculateTicks(): number[] {
    const ticks: number[] = [this.isFakeZero ? 0 : this.min]
    /**
     * detect first step exponent: 0.123 -> -1, 123 -> 2, etc
     */
    let stepExp = Math.floor(Math.log10(this.min))

    /**
     * fill ticks with the power of 10 and equal intervals between them
     * e.g. [10] 20 30 40 50 60 70 80 [100] 200 300 400 500 600 700 800 900 [1000] ...
     */
    let digit = this.isFakeZero
      ? 9
      : Math.round(this.min / Math.pow(10, stepExp))
    let value: number

    do {
      digit++

      if (digit > 9) {
        stepExp++
        digit = 1
      }

      value = fromExponential(digit, stepExp)
      if (value < this.max) {
        ticks.push(value)
      }
    } while (value < this.max)

    ticks.push(this.max)

    return ticks
  }
}

// hack for create right rounded floating value
const fromExponential = (num: number, exp: number): number => +`${num}e${exp}`

const clampValue = (value: number, min: number, max: number) =>
  Math.max(Math.min(value, max), min)

export const normalizeValue = (
  value: number | null | undefined,
  min: number,
  max: number,
): number | null => {
  if (value != null && !Number.isNaN(value) && min <= value && value <= max) {
    return value
  }

  return null
}

type AdjustLabelsParams = {
  leftLabel: HTMLDivElement | null
  rightLabel: HTMLDivElement | null
  dividerLabel: HTMLDivElement | null
  leftOffset: number | null
  rightOffset: number | null
  size: number
  isVertical?: boolean
}

const VALUE_LABELS_SPACING = 20

/**
 * adjustLabels adjusts labels under the handles
 * if labels are too close it prevents them from intersecting
 * and places separator between them (`-` sign)
 */
export const adjustLabels = ({
  leftLabel,
  rightLabel,
  dividerLabel,
  leftOffset,
  rightOffset,
  size,
  isVertical,
}: AdjustLabelsParams): void => {
  let leftWidth = 0
  let rightWidth = 0
  let leftPos = 0
  let rightPos = 0

  if (leftLabel && leftOffset !== null) {
    leftWidth = leftLabel.offsetWidth
    leftPos = Math.min(
      Math.max(0, leftOffset - leftWidth / 2),
      size - leftWidth,
    )
  }

  if (rightLabel && rightOffset !== null) {
    rightWidth = rightLabel.offsetWidth
    rightPos = Math.min(rightOffset - rightWidth / 2, size - rightWidth)
  }

  if (
    leftOffset !== null &&
    rightOffset !== null &&
    leftPos + leftWidth + VALUE_LABELS_SPACING > rightPos
  ) {
    const totalWidth = leftWidth + rightWidth + VALUE_LABELS_SPACING
    const center = (leftOffset + rightOffset) / 2

    leftPos = Math.max(Math.min(center - totalWidth / 2, size - totalWidth), 0)
    rightPos = leftPos + leftWidth + VALUE_LABELS_SPACING

    if (dividerLabel) {
      dividerLabel.style.visibility = 'visible'
      dividerLabel.style.left = `${leftPos + leftWidth}px`
      dividerLabel.style.width = `${VALUE_LABELS_SPACING}px`
    }
  } else {
    if (dividerLabel) {
      dividerLabel.style.visibility = 'hidden'
    }
  }

  if (leftLabel) {
    if (isVertical) {
      leftLabel.style.bottom = `${leftPos}px`
    } else {
      leftLabel.style.left = `${leftPos}px`
    }
  }

  if (rightLabel) {
    rightLabel.style.left = `${rightPos}px`
  }
}
