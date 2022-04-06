import { ReactElement, useEffect } from 'react'

import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { QueryBuilderGroups } from './query-builder/groups/query-builder-groups'
import { QuerySelected } from './query-builder/right-refiner-column/query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => {
  useEffect(() => {
    datasetStore.memorizeFilterConditions()
    filterStore.memorizeSelectedFilters()
  }, [])

  return (
    <div
      className="flex overflow-y-hidden"
      style={{ maxHeight: 'calc(100vh - 203px)' }}
    >
      <QueryBuilderGroups />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
