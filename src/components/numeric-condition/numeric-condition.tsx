import React, { ReactElement } from 'react'

import { NumericConditionNeighborhood } from './numeric-condition-neighborhood'
import { NumericConditionRange } from './numeric-condition-range'
import { INumericConditionProps } from './types'

const RENDER_MODE_NEIGHBORHOOD = 'neighborhood'

export const NumericCondition = (
  props: INumericConditionProps,
): ReactElement => {
  const {
    attrData: { ['render-mode']: renderMode, min, max },
  } = props

  return React.createElement(
    renderMode === RENDER_MODE_NEIGHBORHOOD && min != null && max != null
      ? NumericConditionNeighborhood
      : NumericConditionRange,
    props,
  )
}
