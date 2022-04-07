import React, { ReactElement } from 'react'

import {
  IRangeSliderProps,
  RangeSlider,
  RangeSliderColor,
  RangeSliderScale,
  RangeSliderSide,
} from '@ui/range-slider'
import { TExtendedNumericConditionValue } from '../numeric-condition.utils'
import { getHistogram } from './utils'

export interface INumericConditionRangeSliderProps {
  className?: string
  min: number
  max: number
  isFloat: boolean
  isLogarithmic: boolean
  isZeroSkipped: boolean
  histogramData: number[] | undefined
  value: TExtendedNumericConditionValue
  disabled: RangeSliderSide
  onChange: IRangeSliderProps['onChange']
}

export const NumericConditionRangeSlider = React.memo(
  ({
    className,
    min,
    max,
    isFloat,
    isLogarithmic,
    isZeroSkipped,
    histogramData,
    value,
    disabled,
    onChange,
  }: INumericConditionRangeSliderProps): ReactElement | null => {
    const [minValue, minStrictness, maxValue, maxStrictness] = value
    const [histogram, histogramStep] = getHistogram({
      min,
      max,
      histogramData,
      isFloat,
      isLogarithmic,
      isZeroSkipped,
    })

    let strict = RangeSliderSide.None

    if (!minStrictness && !maxStrictness) {
      strict = RangeSliderSide.Both
    } else if (!minStrictness) {
      strict = RangeSliderSide.Left
    } else if (!maxStrictness) {
      strict = RangeSliderSide.Right
    }

    return (
      <RangeSlider
        className={className}
        min={isZeroSkipped && histogramStep ? histogramStep : min}
        max={max}
        onChange={onChange}
        value={[minValue, maxValue]}
        scale={
          isLogarithmic ? RangeSliderScale.Logarithmic : RangeSliderScale.Linear
        }
        color={
          isLogarithmic ? RangeSliderColor.Secondary : RangeSliderColor.Primary
        }
        strict={strict}
        step={histogramStep || (isFloat ? 0.001 : 1)}
        histogram={histogram}
        disabled={disabled}
      />
    )
  },
)

NumericConditionRangeSlider.displayName = 'NumericConditionRangeSlider'
