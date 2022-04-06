import { ScaleContinuousNumeric } from 'd3'

import { getBounds, getYScaleAndAxis } from '@core/charts'
import { Color, color2str, interpolateColor, parseColor } from '@core/colors'
import { theme } from '@theme'
import { RangeSliderColor, RangeSliderSide } from '../range-slider.interface'

export const pixelRatio = window.devicePixelRatio || 1

const inactiveBarCssColor: string = theme('colors.grey.disabled')
const activeBarPrimaryCssColor: string = theme('colors.blue.hover')
const activeBarSecondaryCssColor: string = theme('colors.purple.bright')
const axisCssColor: string = theme('colors.grey.tertiary')

const activePrimaryColor = parseColor(activeBarPrimaryCssColor)
const activeSecondaryColor = parseColor(activeBarSecondaryCssColor)
const inactiveColor = parseColor(inactiveBarCssColor)

export const prepareCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): void => {
  canvas.getContext('2d')?.scale(pixelRatio, pixelRatio)
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
}

type HistogramAxis = {
  scale: ScaleContinuousNumeric<number, number>
  ticks: number[]
}

export const getYAxis = (data: number[], height: number): HistogramAxis => {
  const [min, max] = getBounds(
    data.filter(value => value > 0),
    item => item,
  )
  const [scale, axis] = getYScaleAndAxis({ min, max, height })

  return { scale, ticks: scale.ticks(...axis.tickArguments()) }
}

const getBarColor = (color: RangeSliderColor): Color =>
  color === RangeSliderColor.Primary ? activePrimaryColor : activeSecondaryColor

type GetPartialFillParams = {
  ctx: CanvasRenderingContext2D
  left: number
  right: number
  x0: number
  x1: number
  y0: number
  y1: number
  color: RangeSliderColor
}

export const getFlatPartialFill = ({
  left,
  right,
  color,
}: GetPartialFillParams): string => {
  return color2str(
    interpolateColor(
      inactiveColor,
      getBarColor(color),
      Math.max(right - left, 0),
    ),
  )
}

export const getVerticalGradientPartialFill = ({
  ctx,
  left,
  right,
  y0,
  y1,
  color,
}: GetPartialFillParams): CanvasGradient => {
  const gradient = ctx.createLinearGradient(0, y0, 0, y1)
  const k = 1 - Math.max(right - left, 0)

  const c = interpolateColor(getBarColor(color), inactiveColor, k)

  gradient.addColorStop(0, inactiveBarCssColor)
  gradient.addColorStop(k, color2str(c))
  gradient.addColorStop(1, activeBarPrimaryCssColor)

  return gradient
}

export const getHorizontalGradientPartialFill = ({
  ctx,
  left,
  right,
  x0,
  x1,
  color,
}: GetPartialFillParams): CanvasGradient => {
  const gradient = ctx.createLinearGradient(x0, 0, x1, 0)
  const activeColor = getBarColor(color)

  const c1 = interpolateColor(activeColor, inactiveColor, left)
  const c2 = interpolateColor(activeColor, inactiveColor, 1 - right)

  gradient.addColorStop(0, inactiveBarCssColor)
  gradient.addColorStop(left, color2str(c1))
  gradient.addColorStop(right, color2str(c2))
  gradient.addColorStop(1, inactiveBarCssColor)

  return gradient
}

export enum HistogramPartialFill {
  Flat,
  Vertical,
  Horizontal,
}

type DrawHistogramParams = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  data: number[]
  selectedArea?: [number, number] | null
  selectedStrict?: RangeSliderSide | null
  yAxis: HistogramAxis
  barPositions: number[]
  barSpacing?: number
  partialFill?: HistogramPartialFill
  color: RangeSliderColor
}

export const drawHistogram = ({
  ctx,
  width,
  height,
  data,
  selectedArea,
  selectedStrict,
  yAxis,
  barPositions,
  barSpacing = 2,
  partialFill = HistogramPartialFill.Horizontal,
  color,
}: DrawHistogramParams): void => {
  const drawWidth = width * pixelRatio
  const drawHeight = height * pixelRatio

  ctx.clearRect(0, 0, drawWidth, drawHeight)

  if (yAxis) {
    ctx.beginPath()
    ctx.strokeStyle = axisCssColor

    for (const value of yAxis.ticks) {
      const y = yAxis.scale(value) * pixelRatio

      ctx.moveTo(0, y)
      ctx.lineTo(drawWidth, y)
      ctx.moveTo(0, y - 1)
      ctx.lineTo(drawWidth, y - 1)
    }

    ctx.stroke()
  }

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(100, 100)
  ctx.stroke()

  const barCount = data.length

  const selectedLeft = selectedArea ? selectedArea[0] * pixelRatio : 0
  const selectedRight = selectedArea ? selectedArea[1] * pixelRatio : 0

  const halfBarDrawSpacing = (barSpacing / 2) * pixelRatio
  const barColor = color2str(getBarColor(color))

  const isLeftStrict =
    selectedStrict === RangeSliderSide.Left ||
    selectedStrict === RangeSliderSide.Both
  const isRightStrict =
    selectedStrict === RangeSliderSide.Right ||
    selectedStrict === RangeSliderSide.Both

  for (let i = 0; i < barCount; ++i) {
    const value = data[i]

    if (!value) {
      continue
    }

    const x0 = Math.max(barPositions[i], 0) * pixelRatio
    const x1 = Math.min(barPositions[i + 1] ?? width, width) * pixelRatio
    const barWidth = x1 - x0
    const y0 = yAxis.scale(data[i]) * pixelRatio
    const y1 = drawHeight

    if (!selectedArea || x0 >= selectedRight || x1 <= selectedLeft) {
      ctx.fillStyle = inactiveBarCssColor
    } else if (selectedStrict) {
      ctx.fillStyle =
        (x0 < selectedLeft && selectedStrict < x1 && isLeftStrict) ||
        (x0 < selectedRight && selectedRight < x1 && isRightStrict)
          ? inactiveBarCssColor
          : barColor
    } else {
      const left = Math.max(selectedLeft - x0, 0) / barWidth
      const right = Math.min(selectedRight - x0, barWidth) / barWidth
      if (
        (left > Number.EPSILON && left < 1) ||
        (right > Number.EPSILON && right < 1)
      ) {
        const fillParams: GetPartialFillParams = {
          ctx,
          left,
          right,
          x0,
          x1,
          y0,
          y1,
          color,
        }

        switch (partialFill) {
          case HistogramPartialFill.Flat:
            ctx.fillStyle = getFlatPartialFill(fillParams)
            break
          case HistogramPartialFill.Vertical:
            ctx.fillStyle = getVerticalGradientPartialFill(fillParams)
            break
          case HistogramPartialFill.Horizontal:
            ctx.fillStyle = getHorizontalGradientPartialFill(fillParams)
            break
        }
      } else {
        ctx.fillStyle = barColor
      }
    }

    ctx.fillRect(
      x0 + (i > 0 ? halfBarDrawSpacing : 0),
      y0,
      barWidth - (i < barCount - 1 ? halfBarDrawSpacing : 0),
      y1 - y0,
    )
  }
}
