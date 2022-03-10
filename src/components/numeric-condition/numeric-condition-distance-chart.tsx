import React, { CSSProperties, ReactElement, useEffect, useRef } from 'react'

import { color2str, interpolateColor, parseColor } from '@core/colors'
import { theme } from '@theme'

export interface INumericConditionDistanceChart {
  className?: string
  style?: CSSProperties
  value: number | null
  max: number
}

const pixelRatio = window.devicePixelRatio || 1

const inactiveCssColor: string = theme('colors.grey.disabled')
const activeCssColor: string = theme('colors.blue.hover')

const inactiveColor = parseColor(inactiveCssColor)
const activeColor = parseColor(activeCssColor)

export const NumericConditionDistanceChart = ({
  className,
  style,
  value,
  max,
}: INumericConditionDistanceChart): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const root = canvas.parentElement

      if (root) {
        const width = root.clientWidth
        const height = root.clientHeight

        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        canvas.width = width * pixelRatio
        canvas.height = height * pixelRatio
        canvas.getContext('2d')?.scale(pixelRatio, pixelRatio)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const { width, height } = canvas

    const pos = Math.max(Math.min(1 - (value ?? 0) / max, 1), 0)
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, inactiveCssColor)
    gradient.addColorStop(
      pos,
      color2str(interpolateColor(activeColor, inactiveColor, pos)),
    )
    gradient.addColorStop(1, activeCssColor)

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = gradient
    ctx.moveTo(width, height)
    ctx.lineTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.fill()
  }, [value, max])

  return (
    <div className={className} style={style}>
      <canvas ref={canvasRef} />
    </div>
  )
}
