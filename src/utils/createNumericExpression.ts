import { NumericExpressionType } from '@core/enum/numeric-expression-types'
import { TNumericConditionBounds } from '@service-providers/common'
import { NumericExpressionTypes } from './../core/enum/numeric-expression-types'

interface ICreateExpression {
  expType: NumericExpressionType
  extraExpType?: NumericExpressionType
  minValue?: string | number
  maxValue?: string | number
}

interface INumericExpressionTypes {
  withMaxValue: TNumericConditionBounds
  withMinValue: TNumericConditionBounds
  withExtraGreaterThan: TNumericConditionBounds
  withExtraGreatOrEqualThan: TNumericConditionBounds
}

export const createNumericExpression = ({
  expType,
  extraExpType,
  minValue,
  maxValue,
}: ICreateExpression): TNumericConditionBounds => {
  const isExtraGreaterThan = (): boolean => {
    return extraExpType === NumericExpressionTypes.GreaterThan
  }

  const isExtraGreatOrEqualThan = (): boolean => {
    return extraExpType === NumericExpressionTypes.GreaterOrEqualThan
  }

  const numericExperssionValues: {
    [NumericExpressionTypes.GreaterThan]: INumericExpressionTypes
    [NumericExpressionTypes.GreaterOrEqualThan]: INumericExpressionTypes
  } = {
    [NumericExpressionTypes.GreaterThan]: {
      withMaxValue: [null, true, +maxValue!, false],
      withMinValue: [+minValue!, false, null, true],
      withExtraGreaterThan: [+minValue!, false, +maxValue!, false],
      withExtraGreatOrEqualThan: [+minValue!, false, +maxValue!, true],
    },

    [NumericExpressionTypes.GreaterOrEqualThan]: {
      withMaxValue: [null, true, +maxValue!, true],
      withMinValue: [+minValue!, true, null, true],
      withExtraGreaterThan: [+minValue!, true, +maxValue!, false],
      withExtraGreatOrEqualThan: [+minValue!, true, +maxValue!, true],
    },
  }

  const getValue = (type: NumericExpressionType): TNumericConditionBounds => {
    const numericValue = numericExperssionValues[type]

    // TODO: need to refactor expression
    switch (true) {
      case minValue === maxValue:
        return numericValue.withExtraGreatOrEqualThan
      case !!maxValue:
        return numericValue.withMaxValue
      case !!minValue:
        return numericValue.withMinValue
      case isExtraGreaterThan():
        return numericValue.withExtraGreaterThan
      case isExtraGreatOrEqualThan():
        return numericValue.withExtraGreatOrEqualThan

      default:
        return numericValue.withExtraGreatOrEqualThan
    }
  }

  return getValue(expType) as TNumericConditionBounds
}
