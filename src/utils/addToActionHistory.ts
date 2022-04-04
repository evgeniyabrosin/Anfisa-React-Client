import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { IDsStatArguments } from '@service-providers/filtering-regime'

export const addToActionHistory = (
  body: IDsStatArguments,
  isFilterRefiner = false,
) => {
  const actionHistory = [...dtreeStore.actionHistory]

  const filtersHistory = JSON.parse(
    JSON.stringify(filterStore.selectedFiltersHistory),
  )

  const nextIndex = dtreeStore.actionHistoryIndex + 1

  if (dtreeStore.actionHistoryIndex > -1) {
    actionHistory.length = nextIndex
    filtersHistory.length = nextIndex
  }

  actionHistory.push(body)
  dtreeStore.setActionHistory(actionHistory)
  dtreeStore.setActionHistoryIndex(nextIndex)

  if (isFilterRefiner) {
    // TODO: implement this logic
    // const filters = filterStore.selectedFilters
    // filtersHistory.push(filters)
    // filterStore.setSelectedFiltersHistory(filtersHistory)
  }
}
