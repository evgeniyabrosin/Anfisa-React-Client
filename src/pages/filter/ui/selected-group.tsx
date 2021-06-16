import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { formatDataToConditions } from '@core/format-data-to-conditions'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'
import { FunctionPanel } from './function-panel'
import { RangePanel } from './range-panel'
import { SelectedGroupItem } from './selected-group-item'

export const SelectedGroup = observer(
  (): ReactElement => {
    const selectedGroupItem = filterStore.selectedGroupItem

    if (!selectedGroupItem.name) {
      return (
        <div className="w-1/3 bg-grey-lighter">
          <div
            className="w-1/3 bg-grey-lighter flex items-center justify-center"
            style={{ height: 'calc(100vh - 100px)' }}
          >
            <p className="text-16 leading-16px text-grey-blue align-center">
              Select a filter
            </p>
          </div>
        </div>
      )
    }

    const groupVariantSum = selectedGroupItem.variants
      ? selectedGroupItem.variants.reduce(
          (prev: number, cur: [string, number]) => prev + cur[1],
          0,
        )
      : 0

    const handleSelect = (variant: [string, number], checked: boolean) => {
      if (checked) {
        filterStore.addSelectedFilters({
          group: selectedGroupItem.vgroup,
          groupItemName: selectedGroupItem.name,
          variant,
        })
      } else {
        filterStore.removeSelectedFilters({
          group: selectedGroupItem.vgroup,
          groupItemName: selectedGroupItem.name,
          variant,
        })
      }

      datasetStore.setConditionsAsync(
        formatDataToConditions(filterStore.selectedFilters),
      )
    }

    return (
      <div
        className="bg-blue-light pt-5 px-4 w-1/3 overflow-y-auto"
        style={{ height: 'calc(100vh - 158px)' }}
      >
        <FilterRefinerGroupItem
          className="pl-0"
          {...selectedGroupItem}
          amount={groupVariantSum}
          onChange={() => filterStore.setSelectedGroupItem({})}
        />

        <div className="bg-white h-px w-full mt-4" />

        {selectedGroupItem.kind === FilterKindEnum.enum && (
          <div className="mt-4">
            {selectedGroupItem.variants &&
              selectedGroupItem.variants.map((variant: any) => (
                <SelectedGroupItem
                  key={variant[0]}
                  name={variant[0]}
                  amount={variant[1]}
                  handleSelect={checked => handleSelect(variant, checked)}
                />
              ))}
          </div>
        )}
        {selectedGroupItem.kind === FilterKindEnum.func && <FunctionPanel />}
        {selectedGroupItem.kind === FilterKindEnum.numeric && <RangePanel />}
      </div>
    )
  },
)
