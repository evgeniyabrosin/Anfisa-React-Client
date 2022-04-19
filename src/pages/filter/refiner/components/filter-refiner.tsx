import { ReactElement, useEffect } from 'react'

import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { QueryBuilderGroups } from '../../common/groups/query-builder-groups'
import { SelectedGroup } from './middle-column/selected-group'
import { QuerySelected } from './right-column/query-selected'

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
