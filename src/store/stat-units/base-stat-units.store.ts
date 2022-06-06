import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreOptions,
} from '@store/common/base-async-data.store'
import {
  AttributeKinds,
  TFilteringStat,
  TFilteringStatCounts,
  TNonFuncPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'
import { TFunctionalUnit, TUnitGroups } from './stat-units.interface'
import { getUnitGroups } from './stat-units.utils'

export abstract class BaseStatUnitsStore<
  Data extends TFilteringStat,
  Request,
> extends BaseAsyncDataStore<Data, Request> {
  protected constructor(options?: TBaseDataStoreOptions) {
    super(options)

    makeObservable(this, {
      units: computed,
      functionalUnits: computed,
      totalCounts: computed,
      filteredCounts: computed,
    })
  }

  getAttributeStatusByName(name: string): TPropertyStatus | undefined {
    const findCallback = (prop: TPropertyStatus) => prop.name === name

    return (
      this.functionalUnits?.find(findCallback) ?? this.units?.find(findCallback)
    )
  }

  get units(): TNonFuncPropertyStatus[] | undefined {
    // TODO: we can remove this filter in future, after the backend removes
    //       functional units from this part of response
    return toJS(
      this.data?.units.filter(unit => unit.kind !== AttributeKinds.FUNC),
    ) as TNonFuncPropertyStatus[] | undefined
  }

  get functionalUnits(): TFunctionalUnit[] {
    return toJS(this.data?.functionalUnits) ?? []
  }

  get totalCounts(): TFilteringStatCounts | undefined {
    return toJS(this.data?.totalCounts)
  }

  get filteredCounts(): TFilteringStatCounts | undefined {
    return toJS(this.data?.filteredCounts)
  }

  get unitGroups(): TUnitGroups {
    if (!this.units || !this.filteredCounts) {
      return []
    }

    return getUnitGroups(this.units, this.filteredCounts)
  }
}
