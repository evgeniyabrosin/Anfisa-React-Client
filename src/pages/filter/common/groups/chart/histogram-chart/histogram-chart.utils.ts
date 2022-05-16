import * as d3 from 'd3'

import { getBounds, getYScaleAndAxis } from '@core/charts'
import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { SvgChartRenderParams } from '@components/svg-chart'
import { tickColor } from '@pages/filter/common/groups/chart/bar-chart/bar-chart.styles'
import { HistogramTypes } from '@service-providers/common'
import {
  THistogramChartData,
  THistogramChartDataItem,
} from '../chart.interface'
import { barColor, logBarColor } from './histogram-chart.styles'

const margin = {
  top: 10,
  right: 24,
  bottom: 18,
  left: 48,
}

type TDrawHistogramParams = SvgChartRenderParams<THistogramChartData> & {
  mode: HistogramTypes
}

const tickMargin = 8

const hideOverlappedTicks = (ticks: SVGGElement[]): void => {
  let leftVisibleRect = ticks[0].getBoundingClientRect()
  let rightVisibleRect = ticks[ticks.length - 1].getBoundingClientRect()

  const isRectOverlapped = (rect: DOMRect) =>
    rect.left < leftVisibleRect.right + tickMargin ||
    rect.right > rightVisibleRect.left - tickMargin

  for (let left = 1, right = ticks.length - 2; left <= right; left++, right--) {
    const leftTick = ticks[left]
    const leftRect = leftTick.getBoundingClientRect()

    if (isRectOverlapped(leftRect)) {
      leftTick.classList.add('hide')
    } else {
      leftVisibleRect = leftRect
      leftTick.classList.remove('hide')
    }

    if (left === right) {
      return
    }

    const rightTick = ticks[right]
    const rightRect = rightTick.getBoundingClientRect()

    if (isRectOverlapped(rightRect)) {
      rightTick.classList.add('hide')
    } else {
      rightVisibleRect = rightRect
      rightTick.classList.remove('hide')
    }
  }
}

const formatLogNumber = (value: number): string => {
  if (value > 1000 || value < 0.001) {
    return value.toExponential(0)
  }

  return formatNumber(value)
}

export const drawHistogram = ({
  svg,
  data,
  width,
  height,
  tooltip,
  mode,
}: TDrawHistogramParams) => {
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const chart = d3
    .select(svg)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const noZeroData = data.filter(({ value }) => value > 0)
  const [min, max] = getBounds(noZeroData, item => item.value)
  const [yScale, yAxis] = getYScaleAndAxis({ min, max, height: chartHeight })

  const isLogMode = mode === HistogramTypes.LOG
  const xScale = isLogMode ? d3.scaleLog() : d3.scaleLinear()
  xScale.domain([data[0].x0, data[data.length - 1].x1]).range([0, chartWidth])

  const xAxis = d3.axisBottom(xScale).tickSize(4)
  const isPoints = !isLogMode && data[0].isPoint

  if (isLogMode) {
    const zeroValue = data[0].isZero ? data[0].x0 : -Infinity
    xAxis
      .tickValues([data[0].x0, ...data.map(item => item.x1)])
      .tickFormat(value => (value === zeroValue ? '' : formatLogNumber(+value)))
  } else {
    xAxis.tickFormat(formatNumber)
    if (isPoints) {
      xAxis.tickValues(data.map(item => item.x0))
    } else {
      xAxis.ticks(5)
    }
  }

  chart
    .append('g')
    .classed('y-axis', true)
    .call(yAxis.tickSizeInner(-chartWidth).tickSizeOuter(0).tickPadding(8))

  chart
    .append('line')
    .attr('x1', 0)
    .attr('x2', chartWidth)
    .attr('y1', chartHeight)
    .attr('y2', chartHeight)
    .attr('stroke', tickColor)

  const xAxisShift = isPoints
    ? (xScale(data[0].x1) - xScale(data[0].x0)) / 2
    : 0
  const xAxisSvg = chart
    .append('g')
    .classed('x-axis', true)
    .attr('transform', `translate(${xAxisShift},${chartHeight})`)
    .call(xAxis)

  if (!isPoints) {
    hideOverlappedTicks(Array.from(xAxisSvg.selectAll('.tick')))
  }

  const renderTooltip = (item: THistogramChartDataItem): string => {
    const { x0, x1, value, isZero, isPoint } = item
    const formatInterval = isLogMode ? formatLogNumber : formatNumber
    let interval: string

    if (isZero) {
      interval = '0'
    } else if (isPoint) {
      interval = `${x0}`
    } else {
      interval = `${formatInterval(x0)} ... ${formatInterval(x1)}`
    }

    return `${interval}<div class='font-medium'>${t('filter.chart.variants', {
      value,
    })}</div>`
  }

  chart
    .selectAll('bar')
    .data(noZeroData)
    .join('rect')
    .attr('x', ({ x0 }) => xScale(x0) + 1)
    .attr('y', ({ value }) => yScale(value))
    .attr('width', ({ x0, x1 }) => xScale(x1) - xScale(x0) - 2)
    .attr('height', ({ value }) => chartHeight - yScale(value))
    .attr('fill', isLogMode ? logBarColor : barColor)
    .on('mouseover', (event, item) => {
      tooltip.show(event.target, renderTooltip(item))
    })
    .on('mouseout', () => {
      tooltip.hide()
    })
}
