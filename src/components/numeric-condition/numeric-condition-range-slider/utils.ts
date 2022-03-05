import { IRangeSliderProps } from '@ui/range-slider'

type TGetHistogramParams = {
  min: number
  max: number
  isFloat: boolean
  isLogarithmic: boolean
  histogramData: number[] | undefined
}

export const getHistogram = ({
  max,
  isFloat,
  isLogarithmic,
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
  const histogramMin = isFloat ? -16 : -1

  while (Math.pow(10, i + histogramMin) <= max && i < histogramData.length) {
    const value = histogramData[i]

    if (needSetFloatStep && i > 0 && value > 0) {
      needSetFloatStep = false
      step = Math.pow(10, i - 17)
    }

    if (i === 0 || !needSetFloatStep) {
      data.push(value)
    }

    ++i
  }

  return [data, step]
}
