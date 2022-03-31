import * as d3 from 'd3'

import { formatNumber } from '@core/format-number'

export const getBounds = <T>(
  data: T[],
  valueGetter: (item: T) => number,
): [number, number] => {
  let min = valueGetter(data[0])
  let max = min

  for (const item of data) {
    const value = valueGetter(item)
    min = Math.min(min, value)
    max = Math.max(max, value)
  }

  return [min, max]
}

export const getYScaleAndAxis = (
  min: number,
  max: number,
  height: number,
): [d3.ScaleContinuousNumeric<number, number>, d3.Axis<number>] => {
  const logMin = Math.max(Math.floor(Math.log10(min)), 0)
  const logMax = Math.ceil(Math.log10(max))

  const isLogScale = logMax - logMin >= 3
  const scale = isLogScale ? d3.scaleLog() : d3.scaleLinear()
  scale.range([height, 0])

  if (isLogScale) {
    scale.domain([Math.pow(10, logMin), max])
  } else {
    scale.domain([0, max])
  }

  const axis = d3
    .axisLeft<number>(scale)
    .ticks(isLogScale ? logMax - logMin - 1 : 4)
    .tickFormat(formatNumber)

  return [scale, axis]
}
