import { ReactElement } from 'react'
import cn from 'classnames'

import { IInheritanceModeArgs } from '@service-providers/common/common.interface'

interface IInheritanceModeViewProps {
  filterId: string
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: IInheritanceModeArgs
}

export const InheritanceModeView = ({
  filterId,
  isFilterActive,
  filterContent,
  filterExpression,
}: IInheritanceModeViewProps): ReactElement => (
  <div
    className={cn('text-14 pb-4 pl-5', { 'bg-blue-tertiary': isFilterActive })}
  >
    <div className="mt-4">
      <div className="px-4 text-grey-blue">Problem group</div>

      {filterExpression &&
        filterExpression['problem_group'].map((subFilterName, idx) => (
          <div
            className={cn('pl-4 py-1', {
              'pt-2': idx === 0,
            })}
            key={filterId + subFilterName}
          >
            {subFilterName}
          </div>
        ))}
    </div>

    <div className="mt-2">
      <div className="px-4 text-grey-blue">Inheritance type</div>

      {filterContent.map((subFilterName, idx) => (
        <div
          className={cn('pl-4 py-1', {
            'pt-2': idx === 0,
          })}
          key={filterId + subFilterName}
        >
          {subFilterName}
        </div>
      ))}
    </div>
  </div>
)
