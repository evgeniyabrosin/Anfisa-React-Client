import { ChartConfiguration, ChartData } from 'chart.js'

import { theme } from '@theme'

export const getChartConfig = (data: ChartData): ChartConfiguration => ({
  type: 'bar',
  data,
  options: {
    layout: { padding: { left: 12, right: 12, top: 12 } },
    plugins: { legend: { display: false } },
    scales: {
      yAxes: {
        ticks: { color: theme('colors.grey.blue') },
        grid: {
          borderWidth: 0,
          borderColor: theme('colors.grey.blue'),
          lineWidth: 1,
        },
        type: 'logarithmic',
      },
      xAxes: {
        display: false,
        grid: {
          borderWidth: 1,
          borderColor: theme('colors.grey.blue'),
          lineWidth: 0,
        },
        ticks: { color: theme('colors.grey.blue') },
      },
    },
  },
})
