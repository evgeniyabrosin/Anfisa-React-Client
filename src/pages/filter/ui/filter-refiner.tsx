import { ReactElement } from 'react'

import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => (
  <div className="flex py-6 px-4">
    <FilterRefinerGroups />

    <SelectedGroup />
    <QuerySelected />
  </div>
)
