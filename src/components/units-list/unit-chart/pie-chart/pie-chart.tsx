import styles from './pie-chart.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { SvgChart } from '@components/svg-chart'
import { PieChartLegend } from '@components/units-list/unit-chart/pie-chart/pie-chart-legend'
import { TPieChartData } from '../unit-chart.interface'
import { drawPieChart, getShortNumber } from './pie-chart.utils'

interface IPieChartProps {
  data: TPieChartData
}

export const PieChart = ({ data }: IPieChartProps): ReactElement | null => {
  const totalCountsOnChart = data.reduce(
    (previousValue, variant) => previousValue + variant[1],
    0,
  )

  return (
    <div className={styles.pieChart}>
      <PieChartLegend
        data={data}
        className={styles.pieChart__legend}
        total={totalCountsOnChart}
      />
      <div className={cn(styles.pieChart__chart, styles.chart)}>
        <div className={styles.chart__total}>
          <span>{t('filter.chart.total')}</span>
          <div className={styles.chart__totalValue}>
            {getShortNumber(totalCountsOnChart)}
          </div>
        </div>
        <SvgChart data={data} render={drawPieChart} />
      </div>
    </div>
  )
}
