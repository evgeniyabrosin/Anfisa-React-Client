import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import { ISolutionEntryDescription } from '@service-providers/common'
import { dtreeProvider } from '@service-providers/decision-trees'

type TAvailableDtreesAsyncStoreQuery = {
  datasetName: string
  code: string
}

export class AvailableDtreesAsyncStore extends BaseAsyncDataStore<
  ISolutionEntryDescription[],
  TAvailableDtreesAsyncStoreQuery
> {
  constructor() {
    super()
  }

  protected fetch(
    query: TAvailableDtreesAsyncStoreQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<ISolutionEntryDescription[]> {
    return dtreeProvider
      .getDtreeSet(
        {
          ds: query.datasetName,
          tm: '0',
          code: 'return False',
        },
        {
          signal: options.abortSignal,
        },
      )
      .then(response => response['dtree-list'])
  }
}
