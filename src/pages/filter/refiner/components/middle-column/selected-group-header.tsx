import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import filterStore from '@store/filter'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'

export const SelectedGroupHeader = observer((): ReactElement => {
  const groupVariantSum = filterStore.selectedGroupItem.variants
    ? filterStore.selectedGroupItem.variants.reduce(
        (prev: number, cur: [string, number]) => prev + cur[1],
        0,
      )
    : 0

  const isFunc = filterStore.selectedGroupItem.kind === FilterKindEnum.Func

  return (
    <div className="flex justify-between flex-wrap">
      <FilterRefinerGroupItem
        className="pl-0"
        {...filterStore.selectedGroupItem}
        amount={groupVariantSum}
        onChange={() => filterStore.setSelectedGroupItem({})}
        isFunc={isFunc}
      />
    </div>
  )
})
