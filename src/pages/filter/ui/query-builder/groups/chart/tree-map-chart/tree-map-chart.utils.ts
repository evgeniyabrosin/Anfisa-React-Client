import * as d3 from 'd3'
import { HierarchyRectangularNode } from 'd3-hierarchy'

import { getBounds } from '@core/charts'
import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { SvgChartRenderParams } from '@components/svg-chart'
import { TVariant } from '@service-providers/common'
import { TTreeMapChartData } from '../chart.interface'

const ROOT = '@@ROOT@@'

const colors = [
  '#0068ae',
  '#0089e5',
  '#18a0fb',
  '#74c6fd',
  '#bae3fe',
  '#d1ecfe',
]

const renderTooltip = (variant: TVariant): string => {
  return `${variant[0]}<div class='font-medium'>${t('filter.chart.variants', {
    value: formatNumber(variant[1]),
  })}</div>`
}

export const drawTreeMap = ({
  svg,
  width,
  height,
  data,
  tooltip,
}: SvgChartRenderParams<TTreeMapChartData>): void => {
  const root = d3
    .stratify<TVariant>()
    .id(variant => variant[0])
    .parentId(variant => (variant[0] === ROOT ? '' : ROOT))([
    [ROOT, 0],
    ...data,
  ])

  root.sum(variant => variant[1])
  const [min, max] = getBounds(data, item => item[1])

  d3.treemap().size([width, height]).padding(1)(root)

  const chart = d3.select(svg).append('g')
  const colorScale = d3
    .scaleLinear<string>()
    .range([colors[0], colors[5]])
    .domain([min, max])

  chart
    .selectAll('rect')
    .data(root.leaves() as HierarchyRectangularNode<TVariant>[])
    .enter()
    .append('rect')
    .attr('x', node => node.x0)
    .attr('y', node => node.y0)
    .attr('width', node => node.x1 - node.x0)
    .attr('height', node => node.y1 - node.y0)
    .style('fill', ({ value }) => (value ? colorScale(value) : 'none'))
    .on('mouseover', (event, item) => {
      tooltip.show(event.target, renderTooltip(item.data))
    })
    .on('mouseout', () => {
      tooltip.hide()
    })
}
