import React, { ReactElement } from 'react'

import {
  IRangeSliderProps,
  RangeSlider,
  RangeSliderColor,
  RangeSliderScale,
  RangeSliderSide,
} from '@ui/range-slider'
import {
  INumericPropertyStatus,
  NumericPropertyStatusSubKinds,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { getHistogram } from './utils'

export interface INumericConditionRangeSliderProps {
  className?: string
  attrData: INumericPropertyStatus
  value: TNumericConditionBounds
  onChange: IRangeSliderProps['onChange']
}

export const NumericConditionRangeSlider = React.memo(
  ({
    className,
    attrData,
    value,
    onChange,
  }: INumericConditionRangeSliderProps): ReactElement | null => {
    const { min, max } = attrData

    if (min == null || max == null || min >= max) {
      return null
    }
    const [renderModeScale] = (attrData['render-mode'] ?? '').split(',')
    const isFloat = attrData['sub-kind'] === NumericPropertyStatusSubKinds.FLOAT
    const isLogarithmic = renderModeScale === 'log'

    const [minValue, minStrictness, maxValue, maxStrictness] = value
    const [histogram, histogramStep] = getHistogram({
      min,
      max,
      histogramData: attrData.histogram?.[3],
      isFloat,
      isLogarithmic,
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
        min={min}
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
        step={histogramStep || isFloat ? 0.001 : 1}
        histogram={histogram}
      />
    )
  },
)

NumericConditionRangeSlider.displayName = 'NumericConditionRangeSlider'
