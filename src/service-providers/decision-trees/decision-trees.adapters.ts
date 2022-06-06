import { adaptFilteringStatsCounts } from '@service-providers/common'
import { IDtreeStatResponse, TDtreeStat } from './decision-trees.interface'

export const adaptDtreeStatResponse = (
  response: IDtreeStatResponse,
): TDtreeStat => {
  return {
    units: response['stat-list'],
    functionalUnits: response.functions,
    filteredCounts: adaptFilteringStatsCounts(response['filtered-counts']),
    totalCounts: adaptFilteringStatsCounts(response['total-counts']),
  }
}
