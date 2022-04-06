import { ReactElement } from 'react'
import cn from 'classnames'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { TFuncArgs } from '@service-providers/common/common.interface'
interface IFuncFilterProps {
  filterId: string
  filterName: string
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: TFuncArgs
}

export const FuncFilter = ({
  filterId,
  filterName,
  isFilterActive,
  filterContent,
  filterExpression,
}: IFuncFilterProps): ReactElement => (
  <>
    {filterName === FuncStepTypesEnum.InheritanceMode ? (
      filterContent.map(subFilterName => (
        <div
          className={cn('flex items-center pl-4 py-4', {
            'bg-blue-tertiary': isFilterActive,
          })}
          key={filterId + subFilterName}
        >
          <span className="text-14 leading-16px ml-5">{subFilterName}</span>
        </div>
      ))
    ) : (
      <div
        className={cn(
          'flex items-center pl-4 py-4',
          isFilterActive && 'bg-blue-tertiary',
        )}
      >
        <span className="text-14 leading-16px ml-5">
          {JSON.stringify(filterExpression)}
        </span>
      </div>
    )}
  </>
)
