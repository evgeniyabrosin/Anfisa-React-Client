import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import { ISolutionEntryDescription } from '@service-providers/common'
import { filteringProvider } from '@service-providers/filtering-regime'

type TAvailablePresetsAsyncStoreQuery = {
  datasetName: string
}

export class AvailablePresetsAsyncStore extends BaseAsyncDataStore<
  ISolutionEntryDescription[],
  TAvailablePresetsAsyncStoreQuery
> {
  constructor() {
    super()
  }

  protected fetch(
    query: TAvailablePresetsAsyncStoreQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<ISolutionEntryDescription[]> {
    return filteringProvider
      .getDsStat(
        {
          ds: query.datasetName,
          tm: 0,
        },
        {
          signal: options.abortSignal,
        },
      )
      .then(response => response['filter-list'])
  }
}
