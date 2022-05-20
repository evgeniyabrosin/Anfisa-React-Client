import { ReactElement, useEffect, useRef } from 'react'

import useClientHeight from '@core/hooks/use-client-height'
import mainTableStore from '@store/ws/main-table.store'
import { FilterRefinerUnits } from './filter-refiner-units'
import { SelectedGroup } from './middle-column/selected-group'
import { QuerySelected } from './right-column/query-selected'

export const FilterRefiner = (): ReactElement => {
  useEffect(() => {
    mainTableStore.memorizeFilterConditions()
  }, [])

  const nonEmptyDivRef = useRef<any>()

  const nonEmptyBlockHeight = useClientHeight(nonEmptyDivRef)

  return (
    <div
      ref={nonEmptyDivRef}
      className="flex overflow-y-hidden"
      style={{ height: nonEmptyBlockHeight }}
    >
      <FilterRefinerUnits />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
