import React, { ReactElement } from 'react'

import { AttributeChartRenderModes } from '@service-providers/common'
import { NumericConditionNeighborhood } from './numeric-condition-neighborhood'
import { NumericConditionRange } from './numeric-condition-range'
import { INumericConditionProps } from './types'

export const NumericCondition = (
  props: INumericConditionProps,
): ReactElement => {
  const {
    attrData: { ['render-mode']: renderMode, min, max },
  } = props

  return React.createElement(
    renderMode === AttributeChartRenderModes.Neighborhood &&
      min != null &&
      max != null
      ? NumericConditionNeighborhood
      : NumericConditionRange,
    props,
  )
}
