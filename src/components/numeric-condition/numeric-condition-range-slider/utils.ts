import { IRangeSliderProps } from '@ui/range-slider'

type TGetHistogramParams = {
  min: number
  max: number
  isFloat: boolean
  isLogarithmic: boolean
  isZeroSkipped: boolean
  histogramData: number[] | undefined
}

const HISTOGRAM_LOG_MIN_EXP = -16

export const getHistogram = ({
  max,
  isFloat,
  isLogarithmic,
  isZeroSkipped,
  histogramData,
}: TGetHistogramParams): [
  IRangeSliderProps['histogram'],
  number | undefined,
] => {
  if (!histogramData) {
    return [undefined, undefined]
  }

  if (!isLogarithmic) {
    return [histogramData, undefined]
  }
  const data: number[] = []
  let step = 0

  let needSetFloatStep = isFloat
  let i = 0
  const histogramMin = isFloat ? HISTOGRAM_LOG_MIN_EXP : -1

  while (Math.pow(10, i + histogramMin) <= max && i < histogramData.length) {
    const value = histogramData[i]

    if (needSetFloatStep && i > 0 && value > 0) {
      needSetFloatStep = false
      step = Math.pow(10, i + HISTOGRAM_LOG_MIN_EXP - 1)
    }

    if ((i === 0 && !isZeroSkipped) || !needSetFloatStep) {
      data.push(value)
    }

    ++i
  }

  return [data, step]
}
