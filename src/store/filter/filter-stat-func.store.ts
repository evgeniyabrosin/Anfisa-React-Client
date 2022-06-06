import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import { BaseStatFuncStore } from '@store/stat-func'
import {
  filteringProvider,
  IStatFunc,
  IStatFuncQuery,
} from '@service-providers/filtering-regime'

export class FilterStatFuncStore extends BaseStatFuncStore<
  IStatFunc,
  IStatFuncQuery
> {
  constructor() {
    super()
  }

  protected fetch(query: IStatFuncQuery): Promise<IStatFunc> {
    return filteringProvider
      .getStatFunc({
        ds: datasetStore.datasetName,
        conditions: filterStore.conditions,
        rq_id: String(Date.now()),
        unit: query.unit,
        param: query.param,
      })
      .then(response => response)
  }
}
