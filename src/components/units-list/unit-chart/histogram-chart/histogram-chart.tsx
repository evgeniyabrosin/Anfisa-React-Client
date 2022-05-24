import { ReactElement } from 'react'

import { SvgChart } from '@components/svg-chart/svg-chart'
import { HistogramTypes } from '@service-providers/common'
import { THistogramChartData } from '../unit-chart.interface'
import { HistogramChartSvg } from './histogram-chart.styles'
import { drawHistogram } from './histogram-chart.utils'

interface IHistogramChartProps {
  mode: HistogramTypes
  data: THistogramChartData
  width?: number
  height?: number
}

export const HistogramChart = ({
  mode,
  data,
  width,
  height,
}: IHistogramChartProps): ReactElement => {
  return (
    <SvgChart
      component={HistogramChartSvg}
      width={width}
      height={height}
      data={data}
      render={params => drawHistogram({ ...params, mode })}
    />
  )
}
