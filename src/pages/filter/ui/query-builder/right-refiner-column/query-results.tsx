import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

export interface IHandleRemoveFilter {
  filterId: string
  filterName: string
  subFilterName: string
}

export const QueryResults = observer((): ReactElement => {
  const keys = Object.keys(filterStore.selectedFilters)

  const selectedFilters = filterStore.selectedFiltersMapAsArray

  // REMOVE: there should be only filterId, subFilterIndex
  const handleRemoveFilter = ({
    filterId,
    filterName,
    subFilterName,
  }: IHandleRemoveFilter) => {
    datasetStore.resetActivePreset()

    filterStore.removeFilterMap(filterId)

    datasetStore.removeCondition({
      subGroup: filterName,
      itemName: subFilterName,
    })

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }
  }

  if (keys.length === 0) {
    return (
      <div
        style={{ height: 'calc(100vh - 223px)' }}
        className="w-full flex justify-center items-center"
      >
        <p className="leading-16px text-grey-blue">
          {t('general.noResultsFound')}
        </p>
      </div>
    )
  }

  return (
    <div
      className="overflow-y-scroll"
      style={{ height: 'calc(100vh - 280px)' }}
    >
      {selectedFilters.map(([filterId, filter]) => (
        <div key={filterId} className="flex flex-col">
          <SelectedFilterCard
            filter={filter}
            handleRemoveFilter={handleRemoveFilter}
          />
        </div>
      ))}
    </div>
  )
})
