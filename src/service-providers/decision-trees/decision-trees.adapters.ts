import { IDtreeStatResponse, TDtreeStat } from './decision-trees.interface'

export const adaptDtreeStatResponse = (
  response: IDtreeStatResponse,
): TDtreeStat => {
  return {
    list: response['stat-list'],
    filteredCounts: response['filtered-counts'],
    totalCounts: response['total-counts'],
  }
}
