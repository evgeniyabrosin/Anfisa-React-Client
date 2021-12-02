import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
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
        [FilterKindEnum.Numeric, selectedFilter.name, [+min, true, +max, true]],
      ])

      filterStore.addSelectedFilterGroup(
        selectedFilter.vgroup,
        selectedFilter.name,
        [[selectedFilter.name, arrayNo.length]],
      )
    }

    const handleClear = () => {
      datasetStore.removeFunctionConditionAsync(selectedFilter.name)

      filterStore.removeSelectedFilters({
        group: selectedFilter.vgroup,
        groupItemName: selectedFilter.name,
        variant: [selectedFilter.name, 0],
      })

      setMin('')
      setMax('')
    }

    return (
      <div>
        <span>Min {selectedFilter.min}</span>

        <Input value={min} onChange={e => setMin(e.target.value)} />

        <span>Max {selectedFilter.max}</span>

        <Input value={max} onChange={e => setMax(e.target.value)} />

        <div className="flex items-center justify-between mt-5">
          <Button text={t('general.clear')} onClick={handleClear} />

          <Button text={t('general.add')} onClick={handleAddConditionsAsync} />
        </div>
      </div>
    )
  },
)
