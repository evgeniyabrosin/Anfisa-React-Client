import { computed, makeObservable, toJS } from 'mobx'

import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  datasetProvider,
  IReccntArguments,
  TAspectDescriptor,
} from '@service-providers/dataset-level'

export class VariantAspectsAsyncStore extends BaseAsyncDataStore<
  TAspectDescriptor[],
  IReccntArguments
> {
  constructor() {
    super()

    makeObservable(this, {
      aspects: computed,
    })
  }

  public get aspects(): TAspectDescriptor[] {
    return toJS(this.data) ?? []
  }

  protected fetch(
    query: IReccntArguments,
    options: TBaseDataStoreFetchOptions,
  ): Promise<TAspectDescriptor[]> {
    return datasetProvider.getRecCnt(query, {
      signal: options.abortSignal,
    })
  }
}
