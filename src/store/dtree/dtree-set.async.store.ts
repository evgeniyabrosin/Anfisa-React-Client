import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import { adaptDtreeSetResponse } from '@service-providers/decision-trees/decision-trees.adapters'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'
import {
  IDtreeSet,
  IDtreeSetArguments,
} from '../../service-providers/decision-trees/decision-trees.interface'

export class DtreeSetAsyncStore extends BaseAsyncDataStore<
  IDtreeSet,
  IDtreeSetArguments
> {
  constructor() {
    super()
  }

  protected fetch(
    params: IDtreeSetArguments,
    options: TBaseDataStoreFetchOptions,
  ): Promise<IDtreeSet> {
    const response = decisionTreesProvider.getDtreeSet(params, {
      signal: options.abortSignal,
    })

    return response.then(data => adaptDtreeSetResponse(data))
  }
}
