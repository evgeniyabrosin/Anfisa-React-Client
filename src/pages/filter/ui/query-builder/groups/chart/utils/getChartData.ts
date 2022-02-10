import { ChartData } from 'chart.js'

import { getHistogramChartData } from './getHistogramChartData'
import { getVariantsChartData } from './getVariantsChartData'

type GetChartDataParams = {
  variants?: any[][]
  histogram?: any[]
}

export const getChartData = ({
  variants,
  histogram,
}: GetChartDataParams): ChartData | undefined => {
  if (histogram) {
    return getHistogramChartData(histogram)
  }

  if (variants) {
    return getVariantsChartData(variants)
  }
}
