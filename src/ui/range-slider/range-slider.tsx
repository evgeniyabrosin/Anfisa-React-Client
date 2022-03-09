import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cn, { Argument } from 'classnames'

import { RangeSliderHistogram } from './range-slider-histogram'
import {
  RangeSliderHandle,
  RangeSliderLabel,
  RangeSliderRange,
  RangeSliderRoot,
  RangeSliderRuler,
  RangeSliderTick,
} from './styles'
import {
  RangeSliderColor,
  RangeSliderMode,
  RangeSliderScale,
  RangeSliderSide,
  RangeSliderValue,
} from './types'
import {
  adjustLabels,
  getScaleTransform,
  getSliderTicks,
  normalizeValue,
} from './utils'

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
}

type DragState = {
  onMouseMove: (event: MouseEvent) => void
  isRightHandle: boolean
}

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
}: IRangeSliderProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const leftLabelRef = useRef<HTMLDivElement>(null)
  const rightLabelRef = useRef<HTMLDivElement>(null)
  const dividerLabelRef = useRef<HTMLDivElement>(null)

  const [rootWidth, setRootWidth] = useState(0)
  const [dragState, setDragState] = useState<DragState | null>(null)

  const isRangeMode = mode === RangeSliderMode.Range
  const hasHistogram = !!histogram

  const { getOffset, getValue, alignValue } = useMemo(
    () =>
      getScaleTransform({
        min,
        max,
        width: rootWidth,
        scale,
        step,
      }),
    [min, max, rootWidth, step, scale],
  )

  const ticks = useMemo(
    () =>
      getSliderTicks({
        min,
        max,
        width: rootWidth,
        scale,
        step,
      }),
    [min, max, rootWidth, step, scale],
  )

  const histogramBarPositions = useMemo(
    // in logarithmic scale we have first fake interval from 0 (-∞),
    // so take it and every 9th tick
    () =>
      hasHistogram && scale === RangeSliderScale.Logarithmic
        ? ticks
            .map(tick => tick.offset)
            .filter((_, i) => i === 0 || (i - 1) % 9 === 0)
        : undefined,
    [scale, hasHistogram, ticks],
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
          ? [getOffset(leftValue ?? min), getOffset(rightValue ?? max)]
          : null
    } else if (leftValue !== null && rightValue !== null) {
      histogramSelectedArea = [
        getOffset(leftValue - rightValue),
        getOffset(leftValue + rightValue),
      ]
    }
  }

  useEffect(() => {
    if (rootRef.current) {
      setRootWidth(rootRef.current.clientWidth)

      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(entries => {
          setRootWidth(entries[0].target.clientWidth)
        })

        observer.observe(rootRef.current)

        return () => {
          observer.disconnect()
        }
      }
    }
  }, [])

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
  }, [dragState, getValue, alignValue])

  const leftOffset = leftValue !== null ? getOffset(leftValue) : null
  const rightOffset =
    isRangeMode && rightValue !== null ? getOffset(rightValue) : null

  useLayoutEffect(
    () =>
      adjustLabels({
        leftLabel: leftLabelRef.current,
        rightLabel: rightLabelRef.current,
        dividerLabel: dividerLabelRef.current,
        leftOffset,
        rightOffset,
        width: rootWidth,
      }),
    [leftOffset, rightOffset, rootWidth],
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (rootRef.current && !dragState) {
      const handle = (event.target as HTMLElement).dataset?.handle
      const { x: rootX } = rootRef.current.getBoundingClientRect()

      const newValue = getValue(event.clientX - rootX)

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
        const handleValue = alignValue(getValue(moveEvent.clientX - rootX))

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

  return (
    <div className={cn('text-xs text-blue-dark', className)}>
      <RangeSliderRoot
        ref={rootRef}
        onMouseDown={!isDisabled ? handleMouseDown : undefined}
        hasHistogram={hasHistogram}
        isActive={!!dragState}
        isDisabled={isDisabled}
      >
        {histogram && (
          <RangeSliderHistogram
            width={rootWidth}
            data={histogram}
            selectedArea={histogramSelectedArea}
            color={color}
            barPositions={histogramBarPositions}
          />
        )}
        <RangeSliderRuler>
          {ticks.map(({ value, offset }) => (
            <RangeSliderTick
              key={value}
              style={{
                left: `${offset}px`,
              }}
            />
          ))}
          {leftValue !== null && (
            <RangeSliderLabel ref={leftLabelRef}>{leftValue}</RangeSliderLabel>
          )}
          {isRangeMode && rightValue !== null && (
            <RangeSliderLabel ref={rightLabelRef}>
              {rightValue}
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
              style={{
                left: `${leftOffset != null ? leftOffset : 0}px`,
                right: `${rightOffset != null ? rootWidth - rightOffset : 0}px`,
              }}
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
                transform: `translateX(${leftOffset}px)`,
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
                transform: `translateX(${rightOffset}px)`,
              }}
            />
          )}
        </RangeSliderRuler>
      </RangeSliderRoot>
    </div>
  )
}
