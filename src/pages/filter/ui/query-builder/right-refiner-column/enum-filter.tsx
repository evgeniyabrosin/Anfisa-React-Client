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
  }: IHandleRemoveFilter) => void
}

export const EnumFilter = ({
  filterId,
  filterName,
  filterContent,
  handleRemoveFilter,
}: Props): ReactElement => (
  <>
    {filterContent.map(subFilterName => (
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
