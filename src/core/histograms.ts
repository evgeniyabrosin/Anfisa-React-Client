import {
  HistogramTypes,
  TNumericPropertyHistogram,
} from '@service-providers/common'

export const adjustHistogramData = (
  histogram: TNumericPropertyHistogram | undefined,
  maxValue: number | undefined,
): TNumericPropertyHistogram | undefined => {
  if (!histogram || maxValue == null) {
    return histogram
  }

  const [type, min, max, data] = histogram

  if (type === HistogramTypes.LOG && Math.pow(10, max - 1) === maxValue) {
    const adjustedData = data.slice(0, -1)

    adjustedData[adjustedData.length - 1] += data[data.length - 1]

    return [type, min, max - 1, adjustedData]
  }

  return histogram
}
