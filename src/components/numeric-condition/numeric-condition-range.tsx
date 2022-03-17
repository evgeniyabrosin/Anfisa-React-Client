import React, { Fragment, ReactElement, useCallback, useMemo } from 'react'

import { t } from '@i18n'
import { InputNumber } from '@ui/input-number'
import { RangeSliderSide } from '@ui/range-slider'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { NumericPropertyStatusSubKinds } from '@service-providers/common/common.interface'
import {
  INumericConditionRangeSliderProps,
  NumericConditionRangeSlider,
} from './numeric-condition-range-slider'
import { StrictnessSelect } from './strictness-select'
import { INumericConditionProps } from './types'
import {
  getIsZeroSkipped,
  NumericValueErrorType,
  NumericValueIndex,
  parseNumeric,
  prepareValue,
  useConditionBoundsValue,
  validateNumericValue,
} from './utils'

export const NumericConditionRange = ({
  className,
  attrData,
  initialValue,
  controls,
}: INumericConditionProps): ReactElement => {
  const isZeroSkipped = useMemo(() => getIsZeroSkipped(attrData), [attrData])
  const [value, setValue] = useConditionBoundsValue(initialValue, isZeroSkipped)

  const [scale] = (attrData['render-mode'] || '').split(',')
  const { min, max, histogram } = attrData
  const isLogarithmic = scale === 'log'
  const isFloat = attrData['sub-kind'] === NumericPropertyStatusSubKinds.FLOAT

  const [minValue, minStrictness, maxValue, maxStrictness, isZeroIncluded] =
    value

  const errors = useMemo(
    () => validateNumericValue(value, min, max),
    [value, min, max],
  )

  const handleRangeSliderChange = useCallback<
    INumericConditionRangeSliderProps['onChange']
  >(
    value => {
      setValue(NumericValueIndex.MinValue, value[0])
      setValue(NumericValueIndex.MaxValue, value[1])
    },
    [setValue],
  )

  const handleZeroIncludedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setValue(NumericValueIndex.IsZeroIncluded, event.target.checked)
    setValue(NumericValueIndex.MinValue, null)
    setValue(NumericValueIndex.MinStrictness, false)
  }

  return (
    <Fragment>
      <div className={className}>
        <div className="relative flex items-center">
          <div className="relative grow flex items-center py-6">
            <div className="absolute top-1 left-0 w-full text-xs text-grey-blue text-left">
              {min}
            </div>
            <div className="grow">
              <InputNumber
                data-test-id={DecisionTreeModalDataCy.leftInput}
                disabled={isZeroIncluded}
                className="h-8 w-full shadow-dark"
                min={min}
                max={max}
                value={minValue ?? ''}
                onChange={event =>
                  setValue(
                    NumericValueIndex.MinValue,
                    parseNumeric(event.target.value, isFloat),
                  )
                }
              />
            </div>
            {errors[NumericValueErrorType.MinValue] && (
              <div className="absolute left-0 bottom-0 text-10 text-red-secondary">
                {t('numericCondition.lowerBoundError')}
              </div>
            )}
            <div className="grow-0 mx-2">
              <StrictnessSelect
                isDisabled={isZeroIncluded}
                value={minStrictness}
                onChange={v => setValue(NumericValueIndex.MinStrictness, v)}
              />
            </div>
          </div>
          <div className="w-4 h-px bg-grey-blue grow-0" />
          <div className="relative grow flex items-center py-6">
            <div className="absolute top-1 left-0 w-full text-xs text-grey-blue text-right">
              {max}
            </div>
            <div className="grow-0 mx-2">
              <StrictnessSelect
                value={maxStrictness}
                onChange={v => setValue(NumericValueIndex.MaxStrictness, v)}
              />
            </div>
            <div className="grow">
              <InputNumber
                data-test-id={DecisionTreeModalDataCy.rightInput}
                className="h-8 w-full shadow-dark"
                min={min}
                max={max}
                value={maxValue ?? ''}
                onChange={event =>
                  setValue(
                    NumericValueIndex.MaxValue,
                    parseNumeric(event.target.value, isFloat),
                  )
                }
              />
            </div>
            {errors[NumericValueErrorType.MaxValue] && (
              <div className="absolute left-0 bottom-0 text-10 text-red-secondary">
                {t('numericCondition.upperBoundError')}
              </div>
            )}
          </div>
          {errors[NumericValueErrorType.Overlap] && (
            <div className="absolute left-0 top-0 right-0 text-10 text-red-secondary text-center">
              {t('numericCondition.conditionError')}
            </div>
          )}
        </div>
        {isZeroSkipped && (
          <div>
            <label className="inline-flex items-center text-sm">
              <input
                type="checkbox"
                checked={isZeroIncluded}
                className="mr-1"
                onChange={handleZeroIncludedChange}
              />
              {t('numericCondition.includeZero', { count: histogram?.[3][0] })}
            </label>
          </div>
        )}
        {min != null && max != null && min < max && (
          <NumericConditionRangeSlider
            className="my-6"
            min={min}
            max={max}
            isLogarithmic={isLogarithmic}
            isFloat={isFloat}
            isZeroSkipped={isZeroSkipped}
            histogramData={histogram?.[3]}
            value={value}
            disabled={
              isZeroIncluded ? RangeSliderSide.Left : RangeSliderSide.None
            }
            onChange={handleRangeSliderChange}
          />
        )}
      </div>
      {controls &&
        controls({
          value: prepareValue(value, isZeroSkipped),
          hasErrors: errors.includes(true),
        })}
    </Fragment>
  )
}
