import { adaptFilteringStatsCounts } from '@service-providers/common'
import { IDsStat, TDsStat } from './filtering-regime.interface'

export const adaptDsStatResponse = (response: IDsStat): TDsStat => {
  return {
    list: response['stat-list'],
    filteredCounts: adaptFilteringStatsCounts(response['filtered-counts']),
    totalCounts: adaptFilteringStatsCounts(response['total-counts']),
  }
}
