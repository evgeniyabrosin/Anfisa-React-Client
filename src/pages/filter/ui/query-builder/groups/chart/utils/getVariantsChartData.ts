import { ChartData } from 'chart.js'

import { theme } from '@theme'

export const getVariantsChartData = (variants: any[]) => {
  const titleList = variants.map((element: any[]) => element[0])

  const quantityList = variants.map((element: any[]) => +element[1])

  const data: ChartData = {
    labels: titleList,
    datasets: [
      {
        data: quantityList,
        backgroundColor: [theme('colors.blue.bright')],
      },
    ],
  }

  return data
}
