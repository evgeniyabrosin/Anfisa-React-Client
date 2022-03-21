import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { TFuncArgs } from '@service-providers/common/common.interface'
import { IHandleRemoveFilter } from './query-results'

interface Props {
  filterId: string
  filterName: string
  filterContent: string[]
  filterExpression: TFuncArgs
  handleRemoveFilter: ({
    filterId,
    filterName,
    subFilterName,
  }: IHandleRemoveFilter) => void
}

export const FuncFilter = ({
  filterId,
  filterName,
  filterContent,
  filterExpression,
  handleRemoveFilter,
}: Props): ReactElement => (
  <>
    {filterName === FuncStepTypesEnum.InheritanceMode ? (
      filterContent.map(subFilterName => (
        <div
          className="flex items-center pl-6 py-4"
          key={filterId + subFilterName}
        >
          <Checkbox
            checked
            onChange={() =>
              //REMOVE: this props to remove
              handleRemoveFilter({
                filterId,
                filterName,
                subFilterName: filterName,
              })
            }
          />

          <span className="text-14 leading-16px font-bold ml-2">
            {subFilterName}
          </span>
        </div>
      ))
    ) : (
      <div className="flex items-center pl-6 py-4">
        <Checkbox
          checked
          onChange={() =>
            handleRemoveFilter({
              filterId,
              filterName,
              subFilterName: JSON.stringify(filterExpression),
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
