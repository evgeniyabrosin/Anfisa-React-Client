import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'

import { IHandleRemoveFilter } from './query-results'
interface Props {
  filterId: string
  isFilterActive: boolean
  filterContent: string[]
  filterType: string
  handleRemoveFilter: ({
    filterId,
    filterType,
    subFilterIdx,
  }: IHandleRemoveFilter) => void
}

export const EnumFilter = ({
  filterId,
  isFilterActive,
  filterContent,
  filterType,
  handleRemoveFilter,
}: Props): ReactElement => (
  <>
    {filterContent.map((subFilterName, subFilterIdx) => (
      <div
        key={filterId + subFilterName}
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
              subFilterIdx,
              filterType,
            })
          }
        />

        <span className="text-14 leading-16px font-bold ml-2">
          {subFilterName}
        </span>
      </div>
    ))}
  </>
)
