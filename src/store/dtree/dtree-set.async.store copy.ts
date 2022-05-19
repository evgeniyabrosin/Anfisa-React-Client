import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'
import {
  IDtreeSetArguments,
  IDtreeSetResponse,
} from './../../service-providers/decision-trees/decision-trees.interface'

export class DtreeSetAsyncStore extends BaseAsyncDataStore<
  IDtreeSetResponse,
  IDtreeSetArguments
> {
  constructor() {
    super()
  }

  protected fetch(
    params: IDtreeSetArguments,
    options: TBaseDataStoreFetchOptions,
  ): Promise<IDtreeSetResponse> {
    return decisionTreesProvider.getDtreeSet(params, {
      signal: options.abortSignal,
    })
  }
}
