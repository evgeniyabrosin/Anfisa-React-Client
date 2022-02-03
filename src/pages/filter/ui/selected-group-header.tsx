import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'

export const SelectedGroupHeader = observer((): ReactElement => {
  const groupVariantSum = filterStore.selectedGroupItem.variants
    ? filterStore.selectedGroupItem.variants.reduce(
        (prev: number, cur: [string, number]) => prev + cur[1],
        0,
      )
    : 0

  return (
    <div className="flex justify-between flex-wrap">
      <FilterRefinerGroupItem
        className="pl-0"
        {...filterStore.selectedGroupItem}
        amount={groupVariantSum}
        onChange={() => filterStore.setSelectedGroupItem({})}
      />
    </div>
  )
})
