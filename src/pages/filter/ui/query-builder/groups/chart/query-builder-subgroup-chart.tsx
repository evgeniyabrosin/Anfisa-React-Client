import { FC, memo, useEffect, useRef, useState } from 'react'
import { ChartConfiguration, ChartData } from 'chart.js'

import { theme } from '@theme'
import Chart from './chart-register'
import { getHistogramChartData } from './utils/getHistogramChartData'
import { getVariantsChartData } from './utils/getVariantsChartData'

interface IQueryBuilderSubgroupChartProps {
  variants?: any[][]
  histogram?: any[]
}

export const QueryBuilderSubgroupChart: FC<IQueryBuilderSubgroupChartProps> = memo(
  ({ variants = [], histogram = [] }) => {
    const ref = useRef<HTMLCanvasElement>(document.createElement('canvas'))
    const [chart, setChart] = useState<Chart>()

    const getChartData = () => {
      let chartData: ChartData | null = null

      if (variants.length > 0) {
        chartData = getVariantsChartData(variants)
      }

      if (histogram.length > 0) {
        chartData = getHistogramChartData(histogram)
      }

      return chartData || ({} as ChartData)
    }

    useEffect(() => {
      const chartData = getChartData()

      const config: ChartConfiguration = {
        type: 'bar',
        data: chartData,
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
      }

      setChart(new Chart(ref.current, config))

      return () => {
        chart?.destroy()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      const newChartData = getChartData()

      if (newChartData && chart && chart.data) {
        chart.data.labels = newChartData.labels
        chart.data.datasets = newChartData.datasets
        chart.update()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variants, histogram, chart])

    return (
      <div className="rounded-md bg-blue-secondary p-2 mr-5">
        <canvas ref={ref} />
      </div>
    )
  },
  (prevProps, nextProps) => {
    if (
      nextProps.variants?.length !== prevProps.variants?.length ||
      nextProps.histogram?.length !== prevProps.histogram?.length
    ) {
      return false
    }

    return true
  },
)
