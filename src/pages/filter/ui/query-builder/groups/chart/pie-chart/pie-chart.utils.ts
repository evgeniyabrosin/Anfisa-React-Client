import * as d3 from 'd3'
import { PieArcDatum } from 'd3'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { theme } from '@theme'
import { SvgChartRenderParams } from '@components/svg-chart'
import { TVariant } from '@service-providers/common'
import { TPieChartData } from '../chart.interface'
import { reduceVariantsData } from '../utils'

export const getShortNumber = (value: number): string => {
  if (value < 1000000) {
    return String(value)
  }
  const shortedValue = (value / 1000000).toFixed(1)
  return `${shortedValue} mln`
}

const colors: string[] = [
  theme('colors.blue.bright'),
  theme('colors.purple.bright'),
  theme('colors.yellow.secondary'),
  theme('colors.orange.bright'),
  theme('colors.grey.blue'),
]

const maxItems = colors.length

export const getPieChartItemColor = (index: number): string =>
  colors[index] ?? colors[colors.length - 1]

export const drawPieChart = ({
  svg,
  data,
  width,
  height,
  tooltip,
}: SvgChartRenderParams<TPieChartData>): void => {
  const radius = Math.min(width, height) / 2

  const slicedData = reduceVariantsData(data, maxItems)

  const chart = d3
    .select(svg)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  const pie = d3.pie<TVariant>().value(variant => variant[1])
  const arcPath = d3
    .arc<PieArcDatum<TVariant>>()
    .innerRadius(radius * 0.6)
    .outerRadius(radius)

  const renderTooltip = ({ value, index }: PieArcDatum<TVariant>): string => {
    return `<span style='position: absolute; margin-top: 5px; width: 5px; height: 5px; border-radius: 3px; background: ${getPieChartItemColor(
      index,
    )}'></span><span class='ml-3'>${
      data[index][0]
    }</span><div class='font-medium'>${t('filter.chart.variants', {
      value: formatNumber(value),
    })}</div>`
  }

  chart
    .selectAll('pieSector')
    .data(pie(slicedData))
    .join('path')
    .attr('d', arcPath)
    .attr('fill', (_, index) => getPieChartItemColor(index))
    .on('mouseover', (event, item) => {
      tooltip.show(event.target, renderTooltip(item))
    })
    .on('mouseout', () => {
      tooltip.hide()
    })
}
