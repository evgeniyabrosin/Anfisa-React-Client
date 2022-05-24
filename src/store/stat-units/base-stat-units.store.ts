import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreOptions,
} from '@store/common/base-async-data.store'
import {
  AttributeKinds,
  TFilteringStat,
  TFilteringStatCounts,
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
      list: computed,
      totalCounts: computed,
      filteredCounts: computed,
    })
  }

  getAttributeStatusByName(name: string): TPropertyStatus | undefined {
    return this.list?.find(prop => prop.name === name)
  }

  get list(): TPropertyStatus[] | undefined {
    return toJS(this.data?.list)
  }

  get totalCounts(): TFilteringStatCounts | undefined {
    return toJS(this.data?.totalCounts)
  }

  get filteredCounts(): TFilteringStatCounts | undefined {
    return toJS(this.data?.filteredCounts)
  }

  get unitGroups(): TUnitGroups {
    if (!this.list || !this.filteredCounts) {
      return []
    }

    return getUnitGroups(this.list, this.filteredCounts)
  }

  get functionalUnits(): TFunctionalUnit[] {
    if (!this.list) {
      return []
    }

    const units: TFunctionalUnit[] = []

    for (const attr of this.list) {
      if (attr.kind === AttributeKinds.FUNC) {
        units.push(attr)
      }
    }

    return units
  }
}
