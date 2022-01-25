import { NumericExpressionTypes } from './../core/enum/numeric-expression-types'

interface ICreateExpression {
  expType: string
  extraExpType?: string
  minValue?: string | number
  maxValue?: string | number
}

export const createNumericExpression = ({
  expType,
  extraExpType,
  minValue,
  maxValue,
}: ICreateExpression) => {
  if (expType === NumericExpressionTypes.GreatThan && maxValue) {
    return [null, true, +maxValue, false]
  }

  if (expType === NumericExpressionTypes.GreatOrEqualThan && maxValue) {
    return [null, true, +maxValue, true]
  }

  if (expType === NumericExpressionTypes.GreatThan && minValue) {
    return [+minValue, false, null, true]
  }

  if (expType === NumericExpressionTypes.GreatOrEqualThan && minValue) {
    return [+minValue, true, null, true]
  }

  if (
    expType === NumericExpressionTypes.GreatThan &&
    extraExpType === NumericExpressionTypes.GreatThan
  ) {
    return [+minValue!, false, +maxValue!, false]
  }

  if (
    expType === NumericExpressionTypes.GreatOrEqualThan &&
    extraExpType === NumericExpressionTypes.GreatThan
  ) {
    return [+minValue!, true, +maxValue!, false]
  }

  if (
    expType === NumericExpressionTypes.GreatThan &&
    extraExpType === NumericExpressionTypes.GreatOrEqualThan
  ) {
    return [+minValue!, false, +maxValue!, true]
  }

  if (
    expType === NumericExpressionTypes.GreatOrEqualThan &&
    extraExpType === NumericExpressionTypes.GreatOrEqualThan
  ) {
    return [+minValue!, true, +maxValue!, true]
  }

  if (minValue === maxValue) {
    return [+minValue!, true, +maxValue!, true]
  }
}
