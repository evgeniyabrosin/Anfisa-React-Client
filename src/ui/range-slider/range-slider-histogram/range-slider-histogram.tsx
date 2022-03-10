import React, { ReactElement, useEffect, useMemo, useRef } from 'react'

import { RangeSliderColor } from '../types'
import {
  RangeSliderHistogramAxisLabel,
  RangeSliderHistogramRoot,
} from './styles'
import { drawHistogram, getYAxis, prepareCanvas } from './utils'

export interface IRangeSliderHistogramProps {
  className?: string
  width: number
  height: number
  data: number[]
  barPositions?: number[]
  selectedArea?: [number, number] | null
  color?: RangeSliderColor
}

export const RangeSliderHistogram = ({
  height,
  width,
  data,
  barPositions: barPositionsProp,
  selectedArea,
  color = RangeSliderColor.Primary,
}: IRangeSliderHistogramProps): ReactElement | null => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const yAxis = useMemo(
    () => getYAxis(Math.max(...data), height),
    [data, height],
  )

  const barPositions = useMemo(
    () =>
      barPositionsProp || data.map((_, index) => (width / data.length) * index),
    [barPositionsProp, width, data],
  )

  useEffect(() => {
    if (canvasRef.current) {
      prepareCanvas(canvasRef.current, width, height)
    }
  }, [width, height])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    if (!ctx || data.length < 2) {
      return
    }

    const handleId = window.requestAnimationFrame(() =>
      drawHistogram({
        ctx,
        width,
        height,
        data,
        yAxis,
        barPositions,
        selectedArea,
        color,
      }),
    )

    return () => window.cancelAnimationFrame(handleId)
  }, [data, width, height, selectedArea, yAxis, color, barPositions])

  if (data.length < 2) {
    return null
  }

  return (
    <RangeSliderHistogramRoot>
      <canvas
        ref={canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
      {yAxis.map(([value, offset]) => (
        <RangeSliderHistogramAxisLabel
          key={value}
          style={{
            top: offset,
          }}
        >
          {value}
        </RangeSliderHistogramAxisLabel>
      ))}
    </RangeSliderHistogramRoot>
  )
}
