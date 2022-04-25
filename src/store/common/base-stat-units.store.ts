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
import { getQueryBuilder, TQueryBuilder } from '@utils/query-builder'

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

  get queryBuilder(): TQueryBuilder {
    if (!this.list || !this.filteredCounts) {
      return []
    }

    return getQueryBuilder(this.list, this.filteredCounts)
  }
}
