import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'

export const moveActionHistory = (value: 1 | -1) => {
  const updatedIndex = dtreeStore.actionHistoryIndex + value

  dtreeStore.setActionHistoryIndex(updatedIndex)

  const body = dtreeStore.actionHistory[updatedIndex]

  const isFilterRefiner = filterStore.method === 'refiner'

  if (isFilterRefiner) {
    const filters = filterStore.selectedFiltersHistory[updatedIndex]

    datasetStore.fetchDsStatAsync(false, body)
    filterStore.setSelectedFilters(filters)
  } else {
    dtreeStore.fetchDtreeSetAsync(body, false)
  }
}
