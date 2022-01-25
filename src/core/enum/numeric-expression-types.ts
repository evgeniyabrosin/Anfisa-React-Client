import { Glb } from '@glb/glb'

export const NumericExpressionTypes = Glb.makeEnum({
  GreaterThan: 'Great_than',
  GreaterOrEqualThan: 'Great_or_equal_than',
})

export type NumericExpressionType = typeof NumericExpressionTypes[keyof typeof NumericExpressionTypes]
