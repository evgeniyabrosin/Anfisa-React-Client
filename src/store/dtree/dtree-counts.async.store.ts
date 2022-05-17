import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  IDtreeCountsArguments,
  IDtreeCountsResponse,
} from '@service-providers/decision-trees'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'

export class DtreeCountsAsyncStore extends BaseAsyncDataStore<
  IDtreeCountsResponse,
  IDtreeCountsArguments
> {
  constructor() {
    super()
  }

  protected fetch(
    params: IDtreeCountsArguments,
    { abortSignal }: TBaseDataStoreFetchOptions,
  ): Promise<IDtreeCountsResponse> {
    return decisionTreesProvider.getFullDtreeCounts(params, {
      abortSignal,
      onPartialResponse: data => {
        this.setData(data)
      },
    })
  }
}
