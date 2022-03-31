import { ReactElement, ReactNode } from 'react'

import { TPropertyStatus } from '@service-providers/common'
import { BarChart } from './bar-chart'
import { ChartType } from './chart.interface'
import { HistogramChart } from './histogram-chart'
import { PieChart } from './pie-chart'
import { useChartConfig } from './utils'

interface IQueryBuilderSubgroupChartProps {
  subGroupItem: TPropertyStatus
}

export const QueryBuilderSubgroupChart = ({
  subGroupItem,
}: IQueryBuilderSubgroupChartProps): ReactElement | null => {
  const chartConfig = useChartConfig(subGroupItem)

  if (!chartConfig) {
    return null
  }

  let chart: ReactNode = null
  switch (chartConfig.type) {
    case ChartType.Bar:
      chart = <BarChart data={chartConfig.data} height={150} />
      break
    case ChartType.Pie:
      chart = <PieChart data={chartConfig.data} />
      break
    case ChartType.Histogram:
      chart = (
        <HistogramChart
          data={chartConfig.data}
          mode={chartConfig.mode}
          height={150}
        />
      )
      break
  }

  if (!chart) {
    return null
  }

  return <div className="rounded-md bg-blue-secondary p-2 mr-5">{chart}</div>
}
