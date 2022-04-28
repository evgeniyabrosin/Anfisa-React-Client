import { ReactElement, useEffect, useRef } from 'react'

import useClientHeight from '@core/hooks/use-client-height'
import datasetStore from '@store/dataset'
import { QueryBuilderGroups } from '../../common/groups/query-builder-groups'
import { SelectedGroup } from './middle-column/selected-group'
import { QuerySelected } from './right-column/query-selected'

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
