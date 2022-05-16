import dtreeStore from '@store/dtree'
import { IDtreeSetArguments } from './../service-providers/decision-trees/decision-trees.interface'

export const addToActionHistory = (
  body: IDtreeSetArguments,
  isFilterRefiner = false,
) => {
  const actionHistory = [...dtreeStore.actionHistory]

  const nextIndex = dtreeStore.actionHistoryIndex + 1

  if (dtreeStore.actionHistoryIndex > -1) {
    actionHistory.length = nextIndex
  }

  actionHistory.push(body)
  dtreeStore.setActionHistory(actionHistory)
  dtreeStore.setActionHistoryIndex(nextIndex)

  if (isFilterRefiner) {
    // TODO: implement this logic
    //  we need some base store for undo/redo,
    //  and local inherited stores for dtree and filter refiner
    // const filters = filterStore.selectedFilters
    // filtersHistory.push(filters)
    // filterStore.setSelectedFiltersHistory(filtersHistory)
  }
}
