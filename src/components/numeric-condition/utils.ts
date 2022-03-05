import { useRef, useState } from 'react'

import { TNumericConditionBounds } from '@service-providers/common/common.interface'

export enum NumericValueIndex {
  MinValue = 0,
  MinStrictness,
  MaxValue,
  MaxStrictness,
}

function updateNumericValue<Index extends NumericValueIndex>(
  currentValue: TNumericConditionBounds,
  index: Index,
  elementValue: TNumericConditionBounds[Index],
): TNumericConditionBounds {
  const copy = currentValue.slice()
  copy[index] = elementValue

  return copy as TNumericConditionBounds
}

const defaultValue: TNumericConditionBounds = [null, false, null, true]

type NumericValueUpdater = {
  (
    index: NumericValueIndex.MinValue | NumericValueIndex.MaxValue,
    value: number | null | undefined,
  ): void

  (
    index: NumericValueIndex.MinStrictness | NumericValueIndex.MaxStrictness,
    value: boolean,
  ): void
}

export const useConditionBoundsValue = (
  initialValue: TNumericConditionBounds | null | undefined,
): [TNumericConditionBounds, NumericValueUpdater] => {
  const [value, setValue] = useState(initialValue || defaultValue)

  const updaterRef = useRef<NumericValueUpdater>()

  if (!updaterRef.current) {
    updaterRef.current = (index, elementValue) => {
      if (!Number.isNaN(value) && elementValue !== undefined) {
        setValue(prevValue =>
          updateNumericValue(prevValue, index, elementValue),
        )
      }
    }
  }

  return [value, updaterRef.current]
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
  value: TNumericConditionBounds,
  min: number | null | undefined,
  max: number | null | undefined,
): NumericValueValidationErrors => {
  const errors: NumericValueValidationErrors = [false, false, false]
  const [minValue, minStrictness, maxValue, maxStrictness] = value

  if (minValue !== null && min != null && minValue < min) {
    errors[NumericValueErrorType.MinValue] = true
  }

  if (maxValue !== null && max != null && maxValue > max) {
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
