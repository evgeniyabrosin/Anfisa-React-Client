import { ChartData } from 'chart.js'

import { theme } from '@theme'

export const getHistogramChartData = (histogram: any[]) => {
  const titleList = histogram[3].map(() => {
    return ''
  })

  titleList[0] = histogram[1]
  titleList[titleList.length - 1] = histogram[2]

  const quantityList = histogram[3]

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
