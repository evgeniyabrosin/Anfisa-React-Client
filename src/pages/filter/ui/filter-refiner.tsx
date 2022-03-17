import { ReactElement, useEffect } from 'react'

import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { QueryBuilderGroups } from './query-builder/groups/query-builder-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => {
  useEffect(() => {
    datasetStore.memorizeFilterConditions()
    filterStore.memorizeSelectedFilters()

    return () => {
      filterStore.filterCondition = {}
    }
  }, [])

  return (
    <div
      className="flex overflow-y-hidden"
      style={{ maxHeight: 'calc(100vh - 201px)' }}
    >
      <QueryBuilderGroups />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
