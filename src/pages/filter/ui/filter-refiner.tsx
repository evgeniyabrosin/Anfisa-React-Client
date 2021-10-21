import { ReactElement, useEffect } from 'react'

import datasetStore from '@store/dataset'
import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => {
  useEffect(() => {
    datasetStore.fetchDsStatAsync()
  }, [])

  return (
    <div
      className="flex overflow-y-hidden"
      style={{ maxHeight: 'calc(100vh - 158px)' }}
    >
      <FilterRefinerGroups />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
