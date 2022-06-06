import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreOptions,
} from '@store/common/base-async-data.store'
import { TVariant } from '@service-providers/common'
import { IStatFunc } from '@service-providers/filtering-regime'

export abstract class BaseStatFuncStore<
  Data extends IStatFunc,
  Request,
> extends BaseAsyncDataStore<Data, Request> {
  protected constructor(options?: TBaseDataStoreOptions) {
    super(options)

    makeObservable(this, {
      variants: computed,
    })
  }

  // amount of getters will be increased in the following func attrs refactors

  public get variants(): TVariant[] | undefined {
    return toJS(this.data?.variants)
  }
}
