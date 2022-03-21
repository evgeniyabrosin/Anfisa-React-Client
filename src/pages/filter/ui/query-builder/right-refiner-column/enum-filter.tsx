import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'

import { IHandleRemoveFilter } from './query-results'

interface Props {
  filterId: string
  filterName: string
  filterContent: string[]
  handleRemoveFilter: ({
    filterId,
    filterName,
    subFilterName,
    filterType,
    subFilterIdx,
  }: IHandleRemoveFilter) => void
  filterType: string
}

export const EnumFilter = ({
  filterId,
  filterName,
  filterContent,
  filterType,
  handleRemoveFilter,
}: Props): ReactElement => (
  <>
    {filterContent.map((subFilterName, subFilterIdx) => (
      <div
        key={filterId + subFilterName}
        className="flex items-center pl-6 py-4"
      >
        <Checkbox
          checked
          onChange={() =>
            handleRemoveFilter({
              filterId,
              filterName,
              subFilterName,
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
