import { makeObservable, observable, runInAction } from 'mobx'

import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  datasetProvider,
  IDsListArguments,
  IGetDsListCompleteResult,
} from '@service-providers/dataset-level'

export class DsListAsyncStore extends BaseAsyncDataStore<
  IGetDsListCompleteResult,
  IDsListArguments
> {
  public status: string = ''

  constructor() {
    super()

    makeObservable(this, {
      status: observable,
    })
  }

  protected fetch(
    query: IDsListArguments,
    options: TBaseDataStoreFetchOptions,
  ): Promise<IGetDsListCompleteResult> {
    const { abortSignal } = options

    return datasetProvider.getDsListComplete(query, {
      abortSignal,
      onStatusChange: status => {
        runInAction(() => {
          this.status = status
        })
      },
    })
  }
}
