import { BaseAsyncDataStore } from '@store/common'
import {
  IDtreeCountsArguments,
  IDtreeCountsResponse,
  IDtreeSetArguments,
} from '@service-providers/decision-trees'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'

export class DtreeCountsAsyncStore extends BaseAsyncDataStore<
  IDtreeCountsResponse,
  IDtreeCountsArguments
> {
  constructor() {
    super()
  }

  protected fetch(params: IDtreeSetArguments): Promise<IDtreeCountsResponse> {
    return decisionTreesProvider.getFullDtreeCounts(params)
  }
}
