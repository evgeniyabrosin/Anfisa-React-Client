import { ReactElement, useEffect } from 'react'

import filterStore from '@store/filter'
import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => {
  useEffect(
    () => () => {
      filterStore.filterCondition = {}
    },
    [],
  )

  return (
    <div
      className="flex overflow-y-hidden"
      style={{ maxHeight: 'calc(100vh - 201px)' }}
    >
      <FilterRefinerGroups />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
