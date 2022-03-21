import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'

import { TNumericConditionBounds } from '@service-providers/common/common.interface'
import { getNumericExpression } from '@utils/getNumericExpression'

interface Props {
  filterId: string
  filterName: string
  handleRemoveFilter: (filterId: string) => void
  numericExpression: TNumericConditionBounds
}

export const NumericFilter = ({
  filterId,
  filterName,
  numericExpression,
  handleRemoveFilter,
}: Props): ReactElement => (
  <div className="flex items-center pl-6 py-4">
    <Checkbox checked onChange={() => handleRemoveFilter(filterId)} />

    <span className="text-14 leading-16px font-bold ml-2">
      {getNumericExpression(numericExpression, filterName)}
    </span>
  </div>
)
