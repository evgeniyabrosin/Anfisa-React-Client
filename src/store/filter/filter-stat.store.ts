import { BaseStatUnitsStore, TBaseDataStoreFetchOptions } from '@store/common'
import { TCondition } from '@service-providers/common'
import { filteringProvider, TDsStat } from '@service-providers/filtering-regime'

export type TFilterStatQuery = {
  datasetName: string
  conditions?: ReadonlyArray<TCondition>
  preset?: string
}

export class FilterStatStore extends BaseStatUnitsStore<
  TDsStat,
  TFilterStatQuery
> {
  constructor() {
    super()
  }

  protected fetch(
    query: TFilterStatQuery,
    { abortSignal }: TBaseDataStoreFetchOptions,
  ): Promise<TDsStat> {
    return filteringProvider.getFullDsStat(
      {
        ds: query.datasetName,
        conditions: query.conditions,
      },
      {
        abortSignal,
        onPartialResponse: data => {
          this.setData(data)
        },
      },
    )
  }
}
