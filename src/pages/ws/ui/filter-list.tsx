import { ReactElement } from 'react'

import { SelectedFiltersType } from '@store/filter'
import { FilterItem } from './filter-item'

interface Props {
  filters: SelectedFiltersType
}

export const FilterList = ({ filters }: Props): ReactElement => {
  const groups = Object.keys(filters)

  return (
    <div className="flex overflow-auto">
      {groups.map(group => (
        <FilterItem key={group} group={group} variants={filters[group]} />
      ))}
    </div>
  )
}
