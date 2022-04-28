import { ReactElement } from 'react'
import cn from 'classnames'

import { TNumericConditionBounds } from '@service-providers/common/common.interface'
import { getNumericExpression } from '@utils/getNumericExpression'

interface INumericFilterProps {
  filterName: string
  isFilterActive: boolean
  numericExpression: TNumericConditionBounds
}

export const NumericFilter = ({
  filterName,
  isFilterActive,
  numericExpression,
}: INumericFilterProps): ReactElement => (
  <div
    className={cn('flex items-center pl-4 py-4', {
      'bg-blue-tertiary': isFilterActive,
    })}
  >
    <span className="text-14 leading-16px ml-5">
      {getNumericExpression(numericExpression, filterName)}
    </span>
  </div>
)
