import { ReactElement } from 'react'

import { SvgChart } from '@components/svg-chart'
import { TTreeMapChartData } from '../chart.interface'
import { drawTreeMap } from './tree-map-chart.utils'

interface ITreeMapChartProps {
  data: TTreeMapChartData
}

export const TreeMapChart = ({ data }: ITreeMapChartProps): ReactElement => {
  return <SvgChart data={data} height={150} render={drawTreeMap} />
}
