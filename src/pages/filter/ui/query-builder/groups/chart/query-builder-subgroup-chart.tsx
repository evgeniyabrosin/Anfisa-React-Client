import { FC, memo, useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'

import Chart from './chart-register'
import { getChartConfig, getChartData } from './utils'

interface IQueryBuilderSubgroupChartProps {
  variants?: any[][]
  histogram?: any[]
}

export const QueryBuilderSubgroupChart: FC<IQueryBuilderSubgroupChartProps> =
  memo(
    ({ variants, histogram }) => {
      const canvasRef = useRef<HTMLCanvasElement>(null)
      const chartRef = useRef<Chart>()

      useEffect(() => {
        if (!canvasRef.current) {
          return
        }

        const chartData = getChartData({ variants, histogram })

        if (chartData) {
          const chart = chartRef.current

          if (!chart) {
            chartRef.current = new Chart(
              canvasRef.current,
              getChartConfig(chartData),
            )
          } else {
            chart.data = chartData
            chart.update()
          }
        } else {
          if (chartRef.current) {
            chartRef.current.destroy()
            chartRef.current = undefined
          }
        }
      }, [variants, histogram])

      useEffect(() => {
        return () => {
          chartRef.current?.destroy()
        }
      }, [])

      return (
        <div className="rounded-md bg-blue-secondary p-2 mr-5">
          <canvas ref={canvasRef} />
        </div>
      )
    },
    (prevProps, nextProps) =>
      isEqual(prevProps.variants, nextProps.variants) &&
      isEqual(prevProps.histogram, nextProps.histogram),
  )

QueryBuilderSubgroupChart.displayName = 'QueryBuilderSubgroupChart'
