import styles from './pie-chart.module.css'

import * as d3 from 'd3'
import { PieArcDatum } from 'd3'

import { theme } from '@theme'
import { SvgChartRenderParams } from '@components/svg-chart'
import { TVariant } from '@service-providers/common'
import { TPieChartData } from '../unit-chart.interface'
import { getVariantCountsText, reduceVariantsData } from '../utils'

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

  const renderTooltip = ({
    index,
    data: variant,
  }: PieArcDatum<TVariant>): string => {
    return `<span class='${
      styles.tooltipPoint
    }' style='background: ${getPieChartItemColor(
      index,
    )}'></span><span class='ml-3'>${
      slicedData[index][0]
    }</span>${getVariantCountsText(variant)}`
  }

  chart
    .selectAll('pieSector')
    .data(pie(slicedData))
    .join('path')
    .attr('d', arcPath)
    .attr('fill', datum => getPieChartItemColor(datum.index))
    .on('mouseover', (event, item) => {
      tooltip.show(event.target, renderTooltip(item))
    })
    .on('mouseout', () => {
      tooltip.hide()
    })
}
