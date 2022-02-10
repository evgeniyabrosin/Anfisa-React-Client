import { RangeSliderScale } from './types'

type GetScaleTransformsParams = {
  min: number
  max: number
  scale: RangeSliderScale
  step: number
  width: number
}

type ScaleTransform = {
  getOffset: (value: number) => number
  getValue: (offset: number) => number
  alignValue: (value: number) => number
}

/**
 * GetScaleTransform make three functions for values converting:
 * 1) getOffset - converts numeric value between min and max to X coordinate on slider
 * 2) getValue - converts X offset on slider to the value between min and max
 * 3) alignValue - clamps value to the slider step
 */
export const getScaleTransform = ({
  min,
  max,
  width,
  step,
  scale,
}: GetScaleTransformsParams): ScaleTransform => {
  if (width <= 0) {
    return {
      getValue: () => 0,
      getOffset: () => 0,
      alignValue: () => 0,
    }
  }

  const clampValue = (value: number) => Math.max(Math.min(value, max), min)

  const fractionDigits = step < 1 ? Math.ceil(-Math.log10(step)) : 0

  const alignValue = (value: number) => {
    let rounded = Math.round(value / step) * step

    if (step < 1) {
      /**
       * if step lower than 1, convert value to decimal string,
       * and then convert back to number, to avoid ieee 754 floating point artifacts
       */
      rounded = +rounded.toFixed(fractionDigits)
    }

    return clampValue(rounded)
  }

  if (scale === 'logarithmic') {
    let pad = 0
    let calcWidth = width
    let logMin = min

    if (min <= 0) {
      /**
       * with logarithmic scale and `min = 0` we should add fake interval
       * from 0 to `step` value, because `log10(0) = -∞`
       */
      logMin = step
      const stepK = Math.log10(max / step) / width
      pad = Math.log10(2) / stepK
      calcWidth = width - pad
    }

    const k = Math.log10(max / logMin) / calcWidth

    return {
      getOffset: value =>
        value === 0 ? 0 : pad + Math.log10(clampValue(value) / logMin) / k,
      getValue: offset =>
        offset < pad / 2
          ? 0
          : logMin * Math.pow(10, Math.max(offset - pad, 0) * k),
      alignValue,
    }
  }

  const k = (max - min) / width

  /**
   * for linear scale use simple linear transform
   */
  return {
    getOffset: value => (clampValue(value) - min) / k,
    getValue: offset => min + offset * k,
    alignValue,
  }
}

type AdjustLabelsParams = {
  leftLabel: HTMLDivElement | null
  rightLabel: HTMLDivElement | null
  dividerLabel: HTMLDivElement | null
  leftOffset: number | null
  rightOffset: number | null
  width: number
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
  width,
}: AdjustLabelsParams): void => {
  let leftWidth = 0
  let rightWidth = 0
  let leftX = 0
  let rightX = 0

  if (leftLabel && leftOffset !== null) {
    leftWidth = leftLabel.offsetWidth
    leftX = Math.min(Math.max(0, leftOffset - leftWidth / 2), width - leftWidth)
  }

  if (rightLabel && rightOffset !== null) {
    rightWidth = rightLabel.offsetWidth
    rightX = Math.min(rightOffset - rightWidth / 2, width - rightWidth)
  }

  if (
    leftOffset !== null &&
    rightOffset !== null &&
    leftX + leftWidth + VALUE_LABELS_SPACING > rightX
  ) {
    const totalWidth = leftWidth + rightWidth + VALUE_LABELS_SPACING
    const center = (leftOffset + rightOffset) / 2

    leftX = Math.max(Math.min(center - totalWidth / 2, width - totalWidth), 0)
    rightX = leftX + leftWidth + VALUE_LABELS_SPACING

    if (dividerLabel) {
      dividerLabel.style.visibility = 'visible'
      dividerLabel.style.left = `${leftX + leftWidth}px`
      dividerLabel.style.width = `${VALUE_LABELS_SPACING}px`
    }
  } else {
    if (dividerLabel) {
      dividerLabel.style.visibility = 'hidden'
    }
  }

  if (leftLabel) {
    leftLabel.style.left = `${leftX}px`
  }

  if (rightLabel) {
    rightLabel.style.left = `${rightX}px`
  }
}

type GetSliderTicksParams = {
  min: number
  max: number
  step: number
  scale: RangeSliderScale
  width: number
}

type SliderTick = {
  value: number
  offset: number
}

const MIN_TICK_SPACE = 30

/**
 * getSliderTicks returns array of numbers with a values for ticks
 */
export const getSliderTicks = ({
  min,
  max,
  step,
  scale,
  width,
}: GetSliderTicksParams): SliderTick[] => {
  const { getOffset } = getScaleTransform({ min, max, step, scale, width })
  const diff = max - min

  const ticks: SliderTick[] = [
    {
      value: min,
      offset: 0,
    },
  ]

  if (scale === 'logarithmic') {
    /**
     * with logarithmic scale detects first tick step
     * is a rounded log10 of min value (or step if min is zero)
     */
    let tickStep = Math.pow(10, Math.ceil(Math.log10(min || step)))
    let nextStep = tickStep * 10
    let value = min + tickStep

    /**
     * fill ticks with the power of 10 and equal intervals between them
     * e.g. [10] 20 30 40 50 60 70 80 [100] 200 300 400 500 600 700 800 900 [1000] ...
     */
    while (value < max) {
      ticks.push({
        value,
        offset: getOffset(value),
      })
      value += tickStep

      if (value >= nextStep - Number.EPSILON) {
        tickStep = nextStep
        nextStep = nextStep * 10
      }
    }
  } else {
    /**
     * detects max avail tick step
     * with linear scale it should be rounded log10 of difference between max and min
     * e.g.
     * 1) `min=10`, `max=50`  => `tickStep=10`,
     *     and in first approach we have ticks: 10, 20, 30, 40, 50
     * 2) `min=10`, `max=500` => `tickStep=100`, ticks: 10, 100, 200, 300, 400, 500
     */
    let tickStep = Math.pow(10, Math.ceil(Math.log10(diff)) - 1)
    let divider = 2
    let candidateStep = tickStep / divider

    /**
     * but in the next step we try to reduce out tick step
     * until we reach a good distance between ticks (MIN_TICK_SPACE)
     */
    while (
      candidateStep > step &&
      getOffset(min + candidateStep) > MIN_TICK_SPACE
    ) {
      candidateStep = tickStep / divider
      tickStep = candidateStep
      divider = divider === 2 ? 5 : 2
    }

    let value = Math.floor((min + tickStep) / tickStep) * tickStep

    while (value < max) {
      ticks.push({
        value,
        offset: getOffset(value),
      })
      value += tickStep
    }
  }

  ticks.push({
    value: max,
    offset: width,
  })

  return ticks
}
