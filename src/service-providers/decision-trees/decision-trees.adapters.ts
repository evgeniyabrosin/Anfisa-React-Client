import { adaptFilteringStatsCounts } from '@service-providers/common'
import { IDtreeStatResponse, TDtreeStat } from './decision-trees.interface'

export const adaptDtreeStatResponse = (
  response: IDtreeStatResponse,
): TDtreeStat => {
  return {
    list: response['stat-list'],
    filteredCounts: adaptFilteringStatsCounts(response['filtered-counts']),
    totalCounts: adaptFilteringStatsCounts(response['total-counts']),
  }
}
