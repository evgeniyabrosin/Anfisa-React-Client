import { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { TPropertyStatus } from '@service-providers/common'
import { BarChart } from './bar-chart'
import { HistogramChart } from './histogram-chart'
import { PieChart } from './pie-chart'
import { ChartType } from './unit-chart.interface'
import { useChartConfig } from './utils'

interface IUnitChartProps {
  className?: string
  unit: TPropertyStatus
}

export const UnitChart = ({
  className,
  unit,
}: IUnitChartProps): ReactElement | null => {
  const chartConfig = useChartConfig(unit)

  if (!chartConfig || !chartConfig.data.length) {
    return null
  }

  let chart: ReactNode = null
  switch (chartConfig.type) {
    case ChartType.Bar:
      chart = (
        <BarChart
          data={chartConfig.data}
          totalItems={chartConfig.totalItems}
          height={150}
        />
      )
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

  return (
    <div className={cn('rounded-md bg-blue-secondary p-4 mr-5', className)}>
      {chart}
    </div>
  )
}
