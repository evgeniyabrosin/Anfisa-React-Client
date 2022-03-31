import { NumericExpressionType } from '@core/enum/numeric-expression-types'
import { InnerValues } from '@glb/glb-types'
import { TNumericConditionBounds } from '@service-providers/common/common.interface'
import { NumericExpressionTypes } from './../core/enum/numeric-expression-types'

interface ICreateExpression {
  expType: NumericExpressionType
  extraExpType?: NumericExpressionType
  minValue?: string | number
  maxValue?: string | number
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

  const numericExperssionValues = {
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

  type NumericExperssionValue = InnerValues<
    typeof numericExperssionValues,
    keyof typeof numericExperssionValues
  >

  const getValue = (type: NumericExpressionType): NumericExperssionValue => {
    let value: NumericExperssionValue = []

    const numericValue = numericExperssionValues[type]

    switch (true) {
      case minValue === maxValue:
        value = numericValue.withExtraGreatOrEqualThan
        break
      case !!maxValue:
        value = numericValue.withMaxValue
        break
      case !!minValue:
        value = numericValue.withMinValue
        break
      case isExtraGreaterThan():
        value = numericValue.withExtraGreaterThan
        break
      case isExtraGreatOrEqualThan():
        value = numericValue.withExtraGreatOrEqualThan
    }

    return value
  }

  return getValue(expType) as TNumericConditionBounds
}
