import { ReactElement } from 'react'

import { SvgChart } from '@components/svg-chart/svg-chart'
import { TBarChartData } from '../chart.interface'
import { BarChartSvg } from './bar-chart.styles'
import { drawBarChart } from './bar-chart.utils'

interface IBarChartProps {
  data: TBarChartData
  width?: number
  height?: number
}

export const BarChart = ({
  data,
  width,
  height,
}: IBarChartProps): ReactElement => {
  return (
    <SvgChart
      component={BarChartSvg}
      width={width}
      height={height}
      data={data}
      render={drawBarChart}
    />
  )
}
