import { ReactElement } from 'react'

import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => (
  <div
    className="flex overflow-y-hidden"
    style={{ maxHeight: 'calc(100vh - 158px)' }}
  >
    <FilterRefinerGroups />
    <SelectedGroup />
    <QuerySelected />
  </div>
)
