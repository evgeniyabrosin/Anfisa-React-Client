import { adaptFilteringStatsCounts } from '@service-providers/common'
import { IDsStat, TDsStat } from './filtering-regime.interface'

export const adaptDsStatResponse = (response: IDsStat): TDsStat => {
  return {
    units: response['stat-list'],
    functionalUnits: response.functions,
    filteredCounts: adaptFilteringStatsCounts(response['filtered-counts']),
    totalCounts: adaptFilteringStatsCounts(response['total-counts']),
  }
}
