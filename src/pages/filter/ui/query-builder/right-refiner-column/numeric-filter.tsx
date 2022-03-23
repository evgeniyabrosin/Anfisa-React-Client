import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'

import { TNumericConditionBounds } from '@service-providers/common/common.interface'
import { getNumericExpression } from '@utils/getNumericExpression'

interface Props {
  filterId: string
  filterName: string
  isFilterActive: boolean
  handleRemoveFilter: (filterId: string) => void
  numericExpression: TNumericConditionBounds
}

export const NumericFilter = ({
  filterId,
  filterName,
  isFilterActive,
  numericExpression,
  handleRemoveFilter,
}: Props): ReactElement => (
  <div
    className={cn(
      'flex items-center pl-4 py-4',
      isFilterActive && 'bg-blue-light',
    )}
  >
    <Checkbox checked onChange={() => handleRemoveFilter(filterId)} />

    <span className="text-14 leading-16px font-bold ml-2">
      {getNumericExpression(numericExpression, filterName)}
    </span>
  </div>
)
