import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { SelectedGroupItem } from './selected-group-item'

export const EnumPanel = observer(
  (): ReactElement => {
    const handleSelect = (variant: [string, number], checked: boolean) => {
      if (checked) {
        filterStore.addSelectedFilters({
          group: filterStore.selectedGroupItem.vgroup,
          groupItemName: filterStore.selectedGroupItem.name,
          variant,
        })

        const conditionIndex = datasetStore.conditions.findIndex(
          item => item[1] === filterStore.selectedGroupItem.name,
        )

        const enumValues =
          conditionIndex === -1
            ? [variant[0]]
            : [...datasetStore.conditions[conditionIndex][3], variant[0]]

        datasetStore.setConditionsAsync([
          [
            FilterKindEnum.Enum,
            filterStore.selectedGroupItem.name,
            '',
            enumValues,
          ],
        ])

        datasetStore.fetchWsListAsync()
      } else {
        filterStore.removeSelectedFilters({
          group: filterStore.selectedGroupItem.vgroup,
          groupItemName: filterStore.selectedGroupItem.name,
          variant,
        })

        datasetStore.removeCondition({
          subGroup: filterStore.selectedGroupItem.name,
          itemName: variant[0],
        })
      }

      datasetStore.fetchWsListAsync()
    }

    const variantsList: StatList[] = toJS(datasetStore.dsStat['stat-list'])

    const currentGroup: StatList | undefined = variantsList.find(
      (item: any) => item.name === filterStore.selectedGroupItem.name,
    )

    return (
      <div className="mt-4">
        {currentGroup?.variants
          ?.filter(variant => variant[1] !== 0)
          ?.map((variant: any) => (
            <SelectedGroupItem
              key={variant[0]}
              name={variant[0]}
              amount={variant[1]}
              handleSelect={checked => handleSelect(variant, checked)}
            />
          ))}
      </div>
    )
  },
)
