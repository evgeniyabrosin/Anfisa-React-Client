import { ReactElement, useEffect, useRef } from 'react'

import useClientHeight from '@core/hooks/use-client-height'
import datasetStore from '@store/dataset'
import { QueryBuilderGroups } from './query-builder/groups/query-builder-groups'
import { QuerySelected } from './query-builder/right-refiner-column/query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => {
  useEffect(() => {
    datasetStore.memorizeFilterConditions()
  }, [])

  const nonEmptyDivRef = useRef<any>()

  const nonEmptyBlockHeight = useClientHeight(nonEmptyDivRef)

  return (
    <div
      ref={nonEmptyDivRef}
      className="flex overflow-y-hidden"
      style={{ height: nonEmptyBlockHeight }}
    >
      <QueryBuilderGroups />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
