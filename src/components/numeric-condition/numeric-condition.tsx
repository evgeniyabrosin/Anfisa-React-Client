import React, { Fragment, ReactElement, useCallback, useMemo } from 'react'

import { t } from '@i18n'
import { InputNumber } from '@ui/input-number'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import {
  INumericPropertyStatus,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import {
  INumericConditionRangeSliderProps,
  NumericConditionRangeSlider,
} from './numeric-condition-range-slider'
import { StrictnessSelect } from './strictness-select'
import {
  NumericValueErrorType,
  NumericValueIndex,
  parseNumeric,
  useConditionBoundsValue,
  validateNumericValue,
} from './utils'

export interface INumericConditionControlsProps {
  value: TNumericConditionBounds
  hasErrors: boolean
}

export interface INumericConditionProps {
  className?: string
  attrData: INumericPropertyStatus
  initialValue?: TNumericConditionBounds
  controls?: (props: INumericConditionControlsProps) => ReactElement | null
}

export const NumericCondition = ({
  className,
  attrData,
  initialValue,
  controls,
}: INumericConditionProps): ReactElement => {
  const { min, max } = attrData
  const [value, setValue] = useConditionBoundsValue(initialValue)
  const [minValue, minStrictness, maxValue, maxStrictness] = value

  const isFloat = attrData['sub-kind'] === 'float'

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

  return (
    <Fragment>
      <div className={className}>
        <div className="relative flex items-center">
          <div className="relative grow flex items-center py-6">
            <div className="absolute top-0 left-0 w-full text-sm text-grey-blue text-left">
              {min}
            </div>
            <div className="grow">
              <InputNumber
                data-test-id={DecisionTreeModalDataCy.leftInput}
                className="h-8 w-full shadow-dark"
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
                {t('dtree.lowerBoundError')}
              </div>
            )}
            <div className="grow-0 mx-2">
              <StrictnessSelect
                value={minStrictness}
                onChange={v => setValue(NumericValueIndex.MinStrictness, v)}
              />
            </div>
          </div>
          <div className="w-4 h-px bg-grey-blue grow-0" />
          <div className="relative grow flex items-center py-6">
            <div className="absolute top-0 left-0 w-full text-sm text-grey-blue text-right">
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
                {t('dtree.upperBoundError')}
              </div>
            )}
          </div>
          {errors[NumericValueErrorType.Overlap] && (
            <div className="absolute left-0 top-0 right-0 text-10 text-red-secondary text-center">
              {t('dtree.conditionError')}
            </div>
          )}
        </div>
        <NumericConditionRangeSlider
          className="my-6"
          attrData={attrData}
          value={value}
          onChange={handleRangeSliderChange}
        />
      </div>
      {controls && controls({ value, hasErrors: errors.includes(true) })}
    </Fragment>
  )
}
