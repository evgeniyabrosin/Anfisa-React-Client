import React, { ReactElement } from 'react'

import { t } from '@i18n'
import { InputNumber } from '@ui/input-number/input-number'
import {
  RangeSlider,
  RangeSliderMode,
  RangeSliderOrientation,
  RangeSliderSide,
} from '@ui/range-slider'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import {
  parseNumeric,
  prepareCenterDistanceValue,
  useCenterDistanceValue,
} from '@components/numeric-condition/numeric-condition.utils'
import { NumericConditionValue } from '@components/numeric-condition/numeric-condition-value'
import { NumericPropertyStatusSubKinds } from '@service-providers/common/common.interface'
import { INumericConditionProps } from './numeric-condition.interface'
import { NumericConditionDistanceChart } from './numeric-condition-distance-chart'

export const NumericConditionNeighborhood = ({
  className,
  initialValue,
  attrData,
  controls,
}: INumericConditionProps): ReactElement | null => {
  const [value, { setCenter, setDistance, clearValue }] =
    useCenterDistanceValue(initialValue, attrData)

  const { min, max, histogram } = attrData

  if (min == null || max == null) {
    return null
  }

  const isFloat = attrData['sub-kind'] === NumericPropertyStatusSubKinds.FLOAT
  const [center, distance] = value
  const conditionValue = prepareCenterDistanceValue(value, min, max)
  const hasErrors =
    (center !== null && (center < min || center > max)) ||
    (distance !== null && distance < 0)
  const maxDistance = isFloat ? (max - min) / 2 : Math.ceil((max - min) / 2)

  return (
    <>
      <div className={className}>
        <div className="relative flex items-center mb-3">
          <div className="relative grow flex items-center py-6">
            <div className="absolute top-1 left-0 text-xs text-grey-blue text-left">
              {min}
            </div>
            <div className="absolute top-1 right-0 text-xs text-grey-blue">
              {max}
            </div>
            <div className="grow">
              <InputNumber
                className="h-8 w-full border border-grey-disabled shadow-input"
                value={center ?? ''}
                placeholder={t('numericCondition.center')}
                onChange={event =>
                  setCenter(parseNumeric(event.target.value, isFloat))
                }
              />
            </div>
          </div>
          <div className="w-4 mx-2 text-grey-blue text-center text-xl grow-0">
            ±
          </div>
          <div className="relative grow flex items-center py-6">
            <div className="grow">
              <InputNumber
                data-test-id={DecisionTreeModalDataCy.rightInput}
                className="h-8 w-full border border-grey-disabled shadow-input"
                placeholder={t('numericCondition.distance')}
                min={0}
                max={maxDistance}
                value={distance ?? ''}
                onChange={event =>
                  setDistance(parseNumeric(event.target.value, isFloat))
                }
              />
            </div>
          </div>
          {hasErrors ? (
            <div className="absolute left-0 bottom-0 right-0 text-10 text-red-secondary text-center">
              {t('numericCondition.conditionError')}
            </div>
          ) : (
            <div className="absolute left-0 bottom-0 right-0 text-center text-xs -mb-1 text-blue-secondary">
              <NumericConditionValue
                value={conditionValue}
                name={attrData.name}
              />
            </div>
          )}
        </div>
        <div className="relative flex items-stretch mb-6">
          <div className="relative grow mr-8">
            <RangeSlider
              className="w-full"
              min={min}
              max={max}
              mode={RangeSliderMode.Single}
              onChange={([newCenter]) => setCenter(newCenter)}
              value={[value[0], value[1] && Math.min(maxDistance, value[1])]}
              strict={RangeSliderSide.None}
              step={isFloat ? 0.001 : 1}
              histogram={histogram?.[3]}
              histogramHeight={120}
            />
          </div>
          <div className="relative flex-grow-0 flex-shrink-0 mr-3 mb-6 pl-8">
            <NumericConditionDistanceChart
              className="absolute left-0 top-0 bottom-0 w-8"
              value={distance}
              max={maxDistance}
            />
            <RangeSlider
              className="h-full -ml-1"
              min={0}
              max={maxDistance}
              orientation={RangeSliderOrientation.Vertical}
              mode={RangeSliderMode.Single}
              onChange={([newDistance]) => setDistance(newDistance)}
              value={[distance]}
              strict={RangeSliderSide.None}
              step={isFloat ? 0.001 : 1}
            />
          </div>
        </div>
      </div>
      {controls &&
        controls({ value: conditionValue, hasErrors: false, clearValue })}
    </>
  )
}
