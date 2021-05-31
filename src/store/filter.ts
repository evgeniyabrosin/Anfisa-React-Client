import { makeAutoObservable, runInAction } from 'mobx'

import { StatListType } from '@declarations'
import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { getApiUrl } from '@core/get-api-url'

export type SelectedFiltersType = Record<
  string,
  Record<string, Record<string, number>>
>

interface AddSelectedFiltersI {
  group: string
  groupItemName: string
  variant?: [string, number]
}

class FilterStore {
  method: FilterMethodEnum = FilterMethodEnum.Query
  selectedGroupItem: StatListType = {}
  dtreeSet: any = {}
  selectedFilters: SelectedFiltersType = {}

  constructor() {
    makeAutoObservable(this)
  }

  setMethod(method: FilterMethodEnum) {
    this.method = method
  }

  setSelectedGroupItem(item: StatListType) {
    this.selectedGroupItem = item
  }

  addSelectedFilters({ group, groupItemName, variant }: AddSelectedFiltersI) {
    if (!this.selectedFilters[group]) {
      this.selectedFilters[group] = {}
    }

    if (!this.selectedFilters[group][groupItemName]) {
      this.selectedFilters[group][groupItemName] = {}
    }

    if (variant) {
      this.selectedFilters[group][groupItemName][variant[0]] = variant[1]
    }
  }

  removeSelectedFilters({
    group,
    groupItemName,
    variant,
  }: AddSelectedFiltersI) {
    if (this.selectedFilters[group][groupItemName] && variant) {
      delete this.selectedFilters[group][groupItemName][variant[0]]
    }
  }

  addSelectedFilterGroup(
    group: string,
    groupItemName: string,
    variants: [string, number][],
  ) {
    if (!this.selectedFilters[group]) {
      this.selectedFilters[group] = {}
    }

    if (!this.selectedFilters[group][groupItemName]) {
      this.selectedFilters[group][groupItemName] = {}
    }

    variants.forEach(variant => {
      this.selectedFilters[group][groupItemName][variant[0]] = variant[1]
    })
  }

  removeSelectedFiltersGroup(group: string, groupItemName: string) {
    if (this.selectedFilters[group]) {
      delete this.selectedFilters[group][groupItemName]
    }
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
