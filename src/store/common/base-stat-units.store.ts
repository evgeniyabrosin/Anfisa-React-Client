import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreOptions,
} from '@store/common/base-async-data.store'
import {
  TFilteringStat,
  TFilteringStatCounts,
  TPropertyStatus,
} from '@service-providers/common'

export type TStatUnitsQueryBuilder = Record<string, TPropertyStatus[]>

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

  get queryBuilder(): TStatUnitsQueryBuilder {
    const groups: TStatUnitsQueryBuilder = {}

    if (this.list) {
      for (const item of this.list) {
        if (groups[item.vgroup]) {
          groups[item.vgroup].push(item)
        } else {
          groups[item.vgroup] = [item]
        }
      }
    }
    return groups
  }
}
