import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import { TCondition, TZoneSetting } from '@service-providers/common'
import { IWsList } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetSupportProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'

export interface IWsListQuery {
  datasetName: string
  filter?: string
  conditions?: ReadonlyArray<TCondition>
  zone?: TZoneSetting[]
}

export class WsListAsyncStore extends BaseAsyncDataStore<
  IWsList,
  IWsListQuery
> {
  constructor() {
    super()
  }

  protected fetch(
    query: IWsListQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<IWsList> {
    return wsDatasetSupportProvider.getWsList(
      {
        ds: query.datasetName,
        filter: query.filter,
        conditions: query.conditions,
        zone: query.zone,
      },
      {
        signal: options.abortSignal,
      },
    )
  }
}
