import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Input } from '@ui/input'

export const RangePanel = observer(
  (): ReactElement => {
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')

    const selectedFilter = filterStore.selectedGroupItem

    const handleAddConditionsAsync = async () => {
      const arrayNo = await datasetStore.setConditionsAsync([
        [FilterKindEnum.numeric, selectedFilter.name, [+min, true, +max, true]],
      ])

      filterStore.addSelectedFilterGroup(
        selectedFilter.vgroup,
        selectedFilter.name,
        [[selectedFilter.name, arrayNo.length]],
      )
    }

    const handleClear = () => {
      datasetStore.removeFunctionCondition(selectedFilter.name)
    }

    return (
      <div>
        <span>Min {selectedFilter.min}</span>
        <Input value={min} onChange={e => setMin(e.target.value)} />

        <span>Max {selectedFilter.max}</span>
        <Input value={max} onChange={e => setMax(e.target.value)} />

        <Button text="Add" onClick={handleAddConditionsAsync} />
        <Button text="Clear" onClick={handleClear} />
      </div>
    )
  },
)
