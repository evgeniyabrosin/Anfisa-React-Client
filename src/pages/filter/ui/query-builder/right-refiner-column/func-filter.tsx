import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { TFuncArgs } from '@service-providers/common/common.interface'
import { IHandleRemoveFilterProps } from './query-results'

interface IFuncFilterProps {
  filterId: string
  filterName: string
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: TFuncArgs
  handleRemoveFilter: ({
    filterId,
    subFilterIdx,
    filterType,
  }: IHandleRemoveFilterProps) => void
  filterType: string
}

export const FuncFilter = ({
  filterId,
  filterName,
  isFilterActive,
  filterContent,
  filterExpression,
  handleRemoveFilter,
  filterType,
}: IFuncFilterProps): ReactElement => (
  <>
    {filterName === FuncStepTypesEnum.InheritanceMode ? (
      filterContent.map((subFilterName, subFilterIdx) => (
        <div
          className={cn(
            'flex items-center pl-4 py-4',
            isFilterActive && 'bg-blue-light',
          )}
          key={filterId + subFilterName}
        >
          <Checkbox
            checked
            onChange={() =>
              handleRemoveFilter({
                filterId,
                subFilterIdx,
                filterType,
              })
            }
          />

          <span className="text-14 leading-16px font-bold ml-2">
            {subFilterName}
          </span>
        </div>
      ))
    ) : (
      <div
        className={cn(
          'flex items-center pl-4 py-4',
          isFilterActive && 'bg-blue-light',
        )}
      >
        <Checkbox
          checked
          onChange={() =>
            handleRemoveFilter({
              filterId,
              subFilterIdx: 0,
              filterType,
            })
          }
        />

        <span className="text-14 leading-16px font-bold ml-2">
          {JSON.stringify(filterExpression)}
        </span>
      </div>
    )}
  </>
)
