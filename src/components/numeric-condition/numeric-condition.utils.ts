import { useMemo, useRef, useState } from 'react'

import {
  INumericPropertyStatus,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'

export enum NumericValueIndex {
  MinValue = 0,
  MinStrictness,
  MaxValue,
  MaxStrictness,
  IsZeroIncluded,
}

export type TExtendedNumericConditionValue = [
  minimalBound: TNumericConditionBounds[0],
  isMinimalNonStrict: TNumericConditionBounds[1],
  maximumBound: TNumericConditionBounds[2],
  isMaximalNonStrict: TNumericConditionBounds[3],
  isZeroIncluded: boolean,
]

function updateNumericValue<Index extends NumericValueIndex>(
  currentValue: TExtendedNumericConditionValue,
  index: Index,
  elementValue: TExtendedNumericConditionValue[Index],
): TExtendedNumericConditionValue {
  const copy = currentValue.slice()
  copy[index] = elementValue

  return copy as TExtendedNumericConditionValue
}

const defaultValue: TExtendedNumericConditionValue = [
  null,
  false,
  null,
  true,
  false,
]

export type TNumericValueUpdater = {
  (
    index: NumericValueIndex.MinValue | NumericValueIndex.MaxValue,
    value: number | null | undefined,
  ): void

  (
    index:
      | NumericValueIndex.MinStrictness
      | NumericValueIndex.MaxStrictness
      | NumericValueIndex.IsZeroIncluded,
    value: boolean,
  ): void
}

const getInitialValue = (
  initialValue: TNumericConditionBounds | null | undefined,
  isZeroSkipped: boolean,
): TExtendedNumericConditionValue => {
  if (!initialValue) {
    return defaultValue
  }

  if (isZeroSkipped) {
    if (initialValue[NumericValueIndex.MinValue] === 0) {
      return [null, false, initialValue[2], initialValue[3], false]
    }

    if (initialValue[NumericValueIndex.MinValue] === null) {
      return [null, false, initialValue[2], initialValue[3], true]
    }
  }

  return [...initialValue, false]
}

type TUseConditionBoundsValueResult = [
  value: TExtendedNumericConditionValue,
  setters: {
    updateValue: TNumericValueUpdater
    clearValue: () => void
  },
]

export const useConditionBoundsValue = (
  initialValue: TNumericConditionBounds | null | undefined,
  isZeroSkipped: boolean,
): TUseConditionBoundsValueResult => {
  const [value, setValue] = useState(() =>
    getInitialValue(initialValue, isZeroSkipped),
  )

  const settersRef = useRef<TUseConditionBoundsValueResult[1]>()

  if (!settersRef.current) {
    settersRef.current = {
      updateValue: (index, elementValue) => {
        if (!Number.isNaN(value) && elementValue !== undefined) {
          setValue(prevValue =>
            updateNumericValue(prevValue, index, elementValue),
          )
        }
      },
      clearValue: () => setValue(defaultValue),
    }
  }

  return [value, settersRef.current]
}

export const parseNumeric = (
  value: string | null | undefined,
  isFloat: boolean,
): number | null => {
  if (!value) {
    return null
  }

  if (isFloat) {
    return parseFloat(value)
  }

  return parseInt(value, 10)
}

export enum NumericValueErrorType {
  MinValue,
  MaxValue,
  Overlap,
}

export type NumericValueValidationErrors = [boolean, boolean, boolean]

export const validateNumericValue = (
  value: TExtendedNumericConditionValue,
  min: number | null | undefined,
  max: number | null | undefined,
): NumericValueValidationErrors => {
  const errors: NumericValueValidationErrors = [false, false, false]
  const [minValue, minStrictness, maxValue, maxStrictness] = value

  if (
    minValue !== null &&
    ((min != null && minValue < min) || (max != null && minValue > max))
  ) {
    errors[NumericValueErrorType.MinValue] = true
  }

  if (
    maxValue !== null &&
    ((min != null && maxValue < min) || (max != null && maxValue > max))
  ) {
    errors[NumericValueErrorType.MaxValue] = true
  }

  if (
    minValue !== null &&
    maxValue !== null &&
    (minValue > maxValue ||
      (!minStrictness && !maxStrictness && minValue === maxValue))
  ) {
    errors[NumericValueErrorType.Overlap] = true
  }

  return errors
}

const HISTOGRAM_LOG_MIN_ZERO = -16

export const getIsZeroSkipped = (attrData: INumericPropertyStatus): boolean => {
  return (
    (attrData['render-mode'] ?? '').startsWith('log') &&
    attrData.histogram?.[1] === HISTOGRAM_LOG_MIN_ZERO
  )
}

export const prepareValue = (
  value: TExtendedNumericConditionValue,
  isZeroSkipped: boolean,
): TNumericConditionBounds => {
  if (isZeroSkipped) {
    if (value[NumericValueIndex.IsZeroIncluded]) {
      return [null, false, value[2], value[3]]
    } else if (value[NumericValueIndex.MinValue] === null) {
      return [0, false, value[2], value[3]]
    }
  }

  return [value[0], value[1], value[2], value[3]]
}

export const getCenterDistanceInitialValue = (
  initialValue: TNumericConditionBounds | null | undefined,
  attrData: INumericPropertyStatus,
): [number | null, number | null] => {
  if (!initialValue) {
    return [null, null]
  }

  const min = initialValue[NumericValueIndex.MinValue] ?? attrData.min
  const max = initialValue[NumericValueIndex.MaxValue] ?? attrData.max

  if (min == null || max == null) {
    return [null, null]
  }

  return [(min + max) / 2, (max - min) / 2]
}

export const prepareCenterDistanceValue = (
  [center, distance]: [number | null, number | null],
  min: number,
  max: number,
): TNumericConditionBounds => {
  if (center === null || distance === null) {
    return [null, true, null, true]
  }

  return [
    Math.max(min, center - distance),
    true,
    Math.min(max, center + distance),
    true,
  ]
}

const coerceDistance = (
  currentDistance: number | null,
  newCenter: number | null,
  attrData: INumericPropertyStatus,
): number | null => {
  const { min, max } = attrData

  if (
    newCenter == null ||
    currentDistance == null ||
    min == null ||
    max == null ||
    newCenter < min ||
    newCenter > max
  ) {
    return currentDistance
  }

  return Math.min(currentDistance, newCenter - min, max - newCenter)
}

const coerceCenter = (
  currentCenter: number | null,
  newDistance: number | null,
  attrData: INumericPropertyStatus,
): number | null => {
  const { min, max } = attrData

  if (
    newDistance == null ||
    currentCenter == null ||
    min == null ||
    max == null ||
    newDistance > (max - min) / 2
  ) {
    return currentCenter
  }

  return Math.min(Math.max(currentCenter, min + newDistance), max - newDistance)
}

type UseCenterDistanceValueResult = [
  value: [number | null, number | null],
  setter: {
    setCenter: (newCenter: number | null) => void
    setDistance: (newDistance: number | null) => void
    clearValue: () => void
  },
]

export const useCenterDistanceValue = (
  initialValue: TNumericConditionBounds | null | undefined,
  attrData: INumericPropertyStatus,
): UseCenterDistanceValueResult => {
  const [value, setValue] = useState(() =>
    getCenterDistanceInitialValue(initialValue, attrData),
  )

  const setters = useMemo(
    () => ({
      setCenter: (newCenter: number | null) => {
        setValue(currentValue => [
          newCenter,
          coerceDistance(currentValue[1], newCenter, attrData),
        ])
      },
      setDistance: (newDistance: number | null) => {
        setValue(currentValue => [
          coerceCenter(currentValue[0], newDistance, attrData),
          newDistance,
        ])
      },
      clearValue: () => setValue([null, null]),
    }),
    [attrData],
  )

  return [value, setters]
}

export const getLimitedRangeInitialState = (
  value: TNumericConditionBounds | undefined,
  attrData: INumericPropertyStatus,
): boolean => {
  const left = value?.[0]
  const right = value?.[2]
  const { min, max } = attrData

  return !(
    (min != null &&
      ((left != null && left < min) || (right != null && right < min))) ||
    (max != null &&
      ((left != null && left > max) || (right != null && right > max)))
  )
}
