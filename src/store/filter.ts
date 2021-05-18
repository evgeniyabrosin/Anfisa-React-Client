import { makeAutoObservable, runInAction } from 'mobx'

import { ANYType, StatListType } from '../..'
import { FilterMethodEnum } from '../core/enum/filter-method.enum'
import { getApiUrl } from '../core/get-api-url'

class FilterStore {
  method: FilterMethodEnum = FilterMethodEnum.Query
  selectedGroupItem: StatListType = {}
  dtreeSet: ANYType = {}

  constructor() {
    makeAutoObservable(this)
  }

  setMethod(method: FilterMethodEnum) {
    this.method = method
  }

  setSelectedGroupItem(item: StatListType) {
    this.selectedGroupItem = item
  }

  async fetchDtreeSetAsync(dsName: string, code: string) {
    const response = await fetch(getApiUrl(`dtree_set`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        ds: dsName,
        code,
      }),
    })

    const result = await response.json()

    runInAction(() => {
      this.dtreeSet = result
    })
  }
}

export default new FilterStore()
