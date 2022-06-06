import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { BaseStatFuncStore } from '@store/stat-func'
import {
  filteringProvider,
  IStatFunc,
  IStatFuncQuery,
} from '@service-providers/filtering-regime'

export class DtreeStatFuncStore extends BaseStatFuncStore<
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
        code: dtreeStore.dtreeCode,
        no: stepStore.stepIndexForApi,
        rq_id: String(Date.now()),
        unit: query.unit,
        param: query.param,
      })
      .then(response => response)
  }
}
