import { FC, useEffect, useRef } from 'react'
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartTypeRegistry,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js'

import { theme } from '@theme'
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
)

type Props = {
  variants?: any[][]
  histogram?: any[]
}

export const QueryBuilderSubgroupChart: FC<Props> = ({
  variants = [],
  histogram,
}) => {
  const ref = useRef<HTMLCanvasElement>(document.createElement('canvas'))

  useEffect(() => {
    let titleList: any[], quantityList: any[], data: any

    if (variants) {
      titleList = variants.map((element: any[]) => element[0])

      quantityList = variants.map((element: any[]) => +element[1])

      data = {
        labels: titleList,
        datasets: [
          {
            data: quantityList,
            backgroundColor: [theme('colors.blue.bright')],
          },
        ],
      }
    }

    if (histogram) {
      titleList = histogram[3].map(() => {
        return ''
      })

      titleList[0] = histogram[1]
      titleList[titleList.length - 1] = histogram[2]

      quantityList = histogram[3]

      data = {
        labels: titleList,
        datasets: [
          {
            data: quantityList,
            backgroundColor: [theme('colors.blue.bright')],
          },
        ],
      }
    }

    const config: ChartConfiguration<
      keyof ChartTypeRegistry,
      number[],
      string
    > = {
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
    }

    const myChart = new Chart(ref.current, config)

    return () => {
      myChart.destroy()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rounded-md bg-blue-secondary p-2 mr-5">
      <canvas ref={ref} />
    </div>
  )
}
