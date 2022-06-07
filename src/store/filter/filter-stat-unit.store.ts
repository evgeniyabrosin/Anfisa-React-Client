import { BaseAsyncDataStore } from '@store/common'
import { TCondition } from '@service-providers/common'
import {
  filteringProvider,
  IStatunits,
} from '@service-providers/filtering-regime'

export type TFilterStatUnitQuery = {
  datasetName: string
  conditions: TCondition[]
  units: string[]
}

export class FilterStatUnitStore extends BaseAsyncDataStore<
  IStatunits,
  TFilterStatUnitQuery
> {
  constructor() {
    super()
  }

  protected fetch(query: TFilterStatUnitQuery): Promise<IStatunits> {
    return filteringProvider.getStatUnits({
      ds: query.datasetName,
      rq_id: '',
      conditions: query.conditions,
      units: query.units,
    })
  }
}
