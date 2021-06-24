import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { makeAutoObservable, runInAction } from 'mobx'

import { StatListType } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'

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
  method: FilterMethodEnum = FilterMethodEnum.Refiner
  selectedGroupItem: StatListType = {}
  dtreeSet: any = {}
  selectedFilters: SelectedFiltersType = {}
  actionName?: ActionFilterEnum

  constructor() {
    makeAutoObservable(this)
  }

  setActionName(actionName: ActionFilterEnum) {
    this.actionName = actionName
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

    if (isEmpty(this.selectedFilters[group][groupItemName])) {
      delete this.selectedFilters[group][groupItemName]
    }

    if (isEmpty(this.selectedFilters[group])) {
      delete this.selectedFilters[group]
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
    if (this.selectedFilters[group][groupItemName]) {
      delete this.selectedFilters[group][groupItemName]
    }

    if (isEmpty(this.selectedFilters[group])) {
      delete this.selectedFilters[group]
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

  async fetchDsInfoAsync() {
    const response = await fetch(
      getApiUrl(`dsinfo?ds=${datasetStore.datasetName}`),
    )

    const result = await response.json()

    return result
  }

  async fetchProblemGroupsAsync() {
    const dsInfo = await this.fetchDsInfoAsync()

    return Object.keys(get(dsInfo, 'meta.samples', {}))
  }

  async fetchStatFuncAsync(
    unit: string,
    param?: Record<string, string | string[]>,
  ) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      unit,
    })

    param && body.append('param', JSON.stringify(param))

    const response = await fetch(getApiUrl(`statfunc`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    return result
  }
}

export default new FilterStore()
