import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cn, { Argument } from 'classnames'

import { formatNumber } from '@core/format-number'
import {
  RangeSliderColor,
  RangeSliderMode,
  RangeSliderOrientation,
  RangeSliderScale,
  RangeSliderSide,
  RangeSliderValue,
} from './range-slider.interface'
import {
  RangeSliderHandle,
  RangeSliderLabel,
  RangeSliderRange,
  RangeSliderRoot,
  RangeSliderRuler,
  RangeSliderTick,
  RangeSliderVerticalRuler,
} from './range-slider.styles'
import {
  adjustLabels,
  normalizeValue,
  RangeSliderLinearAxis,
  RangeSliderLogAxis,
} from './range-slider.utils'
import { RangeSliderHistogram } from './range-slider-histogram'

export interface IRangeSliderProps {
  className?: Argument
  min: number
  max: number
  mode?: RangeSliderMode
  step?: number
  scale?: RangeSliderScale
  value: RangeSliderValue | null
  onChange: (value: RangeSliderValue) => void
  disabled?: RangeSliderSide
  strict?: RangeSliderSide
  color?: RangeSliderColor
  histogram?: number[]
  histogramHeight?: number
  orientation?: RangeSliderOrientation
}

type DragState = {
  onMouseMove: (event: MouseEvent) => void
  isRightHandle: boolean
}

const DEFAULT_RANGE_SLIDER_HISTOGRAM = 80

// TODO: vertical histogram

export const RangeSlider = ({
  className,
  value,
  onChange,
  max,
  min,
  mode = RangeSliderMode.Range,
  step = 1,
  scale = RangeSliderScale.Linear,
  color = RangeSliderColor.Primary,
  disabled,
  strict,
  histogram,
  histogramHeight = DEFAULT_RANGE_SLIDER_HISTOGRAM,
  orientation = RangeSliderOrientation.Horizontal,
}: IRangeSliderProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const leftLabelRef = useRef<HTMLDivElement>(null)
  const rightLabelRef = useRef<HTMLDivElement>(null)
  const dividerLabelRef = useRef<HTMLDivElement>(null)

  const [size, setSize] = useState(0)
  const [dragState, setDragState] = useState<DragState | null>(null)

  const isLogarithmic = scale === RangeSliderScale.Logarithmic
  const isRangeMode = mode === RangeSliderMode.Range
  const hasHistogram = !!histogram
  const isLogarithmicHistogram = hasHistogram && isLogarithmic
  const fakeZero = isLogarithmic && min === 0 ? 0.1 : undefined

  const isHistogramPoints = hasHistogram
    ? scale === RangeSliderScale.Linear && max - min + 1 === histogram.length
    : false
  const isVertical = orientation === RangeSliderOrientation.Vertical

  const axis = useMemo(
    () =>
      isLogarithmic
        ? new RangeSliderLogAxis({ min, max, size, fakeZero })
        : new RangeSliderLinearAxis({
            min,
            max,
            size,
            step,
            isHistogramPoints,
          }),
    [min, max, size, step, isLogarithmic, isHistogramPoints, fakeZero],
  )

  const histogramBarPositions = useMemo(
    // in logarithmic scale we have first fake interval from 0 (-∞),
    // so take it and every 9th tick
    () =>
      isLogarithmicHistogram
        ? axis.ticks
            .map(tick => axis.getOffset(tick))
            .filter((_, i) =>
              min > 0 ? i % 9 === 0 : i === 0 || (i - 1) % 9 === 0,
            )
        : undefined,
    [isLogarithmicHistogram, axis, min],
  )

  let leftValue = normalizeValue(value?.[0], min, max)
  // in single mode second part of the value is used for a histogram fill radius
  let rightValue = normalizeValue(value?.[1], isRangeMode ? min : 0, max)

  if (
    isRangeMode &&
    leftValue != null &&
    rightValue != null &&
    rightValue < leftValue
  ) {
    leftValue = null
    rightValue = null
  }

  let histogramSelectedArea: [number, number] | null = null

  if (hasHistogram) {
    if (isRangeMode) {
      histogramSelectedArea =
        leftValue !== null || rightValue !== null
          ? [
              leftValue !== null ? axis.getOffset(leftValue) : 0,
              rightValue !== null ? axis.getOffset(rightValue) : size,
            ]
          : null
    } else if (leftValue !== null && rightValue !== null) {
      histogramSelectedArea = [
        axis.getOffset(leftValue - rightValue),
        axis.getOffset(leftValue + rightValue),
      ]
    }
  }

  useEffect(() => {
    if (rootRef.current) {
      setSize(rootRef.current.clientWidth)

      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(entries => {
          setSize(
            isVertical
              ? entries[0].target.clientHeight
              : entries[0].target.clientWidth,
          )
        })

        observer.observe(rootRef.current)

        return () => {
          observer.disconnect()
        }
      }
    }
  }, [isVertical])

  useEffect(() => {
    if (dragState) {
      const { onMouseMove } = dragState

      const stopDrag = () => {
        setDragState(null)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', stopDrag)
      document.addEventListener('mouseleave', stopDrag)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', stopDrag)
        document.removeEventListener('mouseleave', stopDrag)
      }
    }
  }, [dragState])

  const leftOffset = leftValue !== null ? axis.getOffset(leftValue) : null
  const rightOffset =
    isRangeMode && rightValue !== null ? axis.getOffset(rightValue) : null

  useLayoutEffect(
    () =>
      adjustLabels({
        leftLabel: leftLabelRef.current,
        rightLabel: rightLabelRef.current,
        dividerLabel: dividerLabelRef.current,
        leftOffset,
        rightOffset,
        size,
        isVertical,
      }),
    [leftOffset, rightOffset, size, isVertical],
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (rootRef.current && !dragState) {
      const handle = (event.target as HTMLElement).dataset?.handle
      const rootRect = rootRef.current.getBoundingClientRect()
      const origin = isVertical ? rootRect.bottom : rootRect.x

      const getValueFromEvent = (
        event: MouseEvent | React.MouseEvent,
      ): number => {
        return axis.getValue(
          isVertical ? origin - event.clientY : event.clientX - origin,
        )
      }

      const newValue = getValueFromEvent(event)

      const isRightHandle =
        isRangeMode &&
        disabled !== RangeSliderSide.Right &&
        handle !== 'left' &&
        (disabled === RangeSliderSide.Left ||
          handle === 'right' ||
          (leftValue != null && rightValue == null && newValue > leftValue) ||
          (leftValue != null &&
            rightValue != null &&
            Math.abs(rightValue - newValue) < Math.abs(leftValue - newValue)))

      const onMouseMove = (moveEvent: MouseEvent) => {
        const handleValue = getValueFromEvent(moveEvent)

        if (isRightHandle) {
          if (leftValue == null || handleValue > leftValue) {
            onChange([leftValue, handleValue])
          }
        } else {
          if (!isRangeMode || rightValue == null || handleValue < rightValue) {
            onChange([handleValue, rightValue])
          }
        }
      }

      setDragState({
        onMouseMove,
        isRightHandle,
      })

      if (!handle) {
        onMouseMove(event.nativeEvent)
      }
    }
  }

  const isDisabled = disabled === RangeSliderSide.Both

  const Ruler = isVertical ? RangeSliderVerticalRuler : RangeSliderRuler

  return (
    <div className={cn('text-xs text-blue-dark', className)}>
      <RangeSliderRoot
        ref={rootRef}
        onMouseDown={!isDisabled ? handleMouseDown : undefined}
        hasHistogram={hasHistogram}
        isActive={!!dragState}
        isDisabled={isDisabled}
        isVertical={isVertical}
      >
        {histogram && (
          <RangeSliderHistogram
            width={size}
            height={histogramHeight}
            data={histogram}
            selectedArea={histogramSelectedArea}
            selectedStrict={isHistogramPoints ? strict : null}
            color={color}
            barPositions={histogramBarPositions}
          />
        )}
        <Ruler>
          {axis.ticks.map(value => {
            const offset = axis.getOffset(value)

            return (
              <RangeSliderTick
                key={value}
                style={
                  isVertical
                    ? { bottom: `${offset}px` }
                    : { left: `${offset}px` }
                }
              />
            )
          })}
          {leftValue !== null && (
            <RangeSliderLabel ref={leftLabelRef}>
              {formatNumber(leftValue)}
            </RangeSliderLabel>
          )}
          {isRangeMode && rightValue !== null && (
            <RangeSliderLabel ref={rightLabelRef}>
              {formatNumber(rightValue)}
            </RangeSliderLabel>
          )}
          {isRangeMode && (
            <RangeSliderLabel
              ref={dividerLabelRef}
              style={{
                textAlign: 'center',
                visibility: 'hidden',
              }}
            >
              –
            </RangeSliderLabel>
          )}
          {isRangeMode && (leftValue != null || rightValue != null) && (
            <RangeSliderRange
              color={color}
              isDisabled={isDisabled}
              isLeftHandle={leftOffset != null}
              isRightHandle={rightOffset != null}
              style={
                isVertical
                  ? {
                      top: `${rightOffset != null ? rightOffset : 0}px`,
                      bottom: `${leftOffset != null ? leftOffset : 0}px`,
                    }
                  : {
                      left: `${leftOffset != null ? leftOffset : 0}px`,
                      right: `${
                        rightOffset != null ? size - rightOffset : 0
                      }px`,
                    }
              }
            />
          )}
          {leftOffset !== null && (
            <RangeSliderHandle
              data-handle="left"
              color={color}
              isActive={!!(dragState && !dragState.isRightHandle)}
              isDisabled={isDisabled || disabled === RangeSliderSide.Left}
              isStrict={
                strict === RangeSliderSide.Left ||
                strict === RangeSliderSide.Both
              }
              style={{
                transform: isVertical
                  ? `translateY(${size - leftOffset}px)`
                  : `translateX(${leftOffset}px)`,
              }}
            />
          )}
          {isRangeMode && rightOffset !== null && (
            <RangeSliderHandle
              data-handle="right"
              color={color}
              isActive={!!(dragState && dragState.isRightHandle)}
              isDisabled={isDisabled || disabled === RangeSliderSide.Right}
              isStrict={
                strict === RangeSliderSide.Right ||
                strict === RangeSliderSide.Both
              }
              style={{
                transform: isVertical
                  ? `translateY(${size - rightOffset}px)`
                  : `translateX(${rightOffset}px)`,
              }}
            />
          )}
        </Ruler>
      </RangeSliderRoot>
    </div>
  )
}
