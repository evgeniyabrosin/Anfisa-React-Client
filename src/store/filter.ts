import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { makeAutoObservable, runInAction } from 'mobx'

import { IStatFuncData, StatListType } from '@declarations'
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
  method: FilterMethodEnum = FilterMethodEnum.DecisionTree
  selectedGroupItem: StatListType = {}
  dtreeSet: any = {}
  selectedFilters: SelectedFiltersType = {}
  actionName?: ActionFilterEnum
  statFuncData: any = []
  error = ''

  selectedFiltersHistory: SelectedFiltersType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setActionName(actionName?: ActionFilterEnum) {
    this.actionName = actionName
  }

  resetActionName() {
    this.actionName = undefined
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
    if (!this.selectedFilters[group]) {
      return
    }

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

  async fetchStatFuncAsync(unit: string, param?: any) {
    const conditions = JSON.stringify(datasetStore.conditions)

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions,
      rq_id: String(Date.now()),
      unit,
    })

    param && body.append('param', param)

    const response = await fetch(getApiUrl(`statfunc`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result: IStatFuncData = await response.json()

    runInAction(() => {
      this.statFuncData = result
    })

    return result
  }

  setError(value: string) {
    this.error = value
  }

  resetData() {
    this.method = FilterMethodEnum.DecisionTree
    this.selectedGroupItem = {}
    this.dtreeSet = {}
    this.selectedFilters = {}
  }

  setSelectedFilters(filters: SelectedFiltersType) {
    this.selectedFilters = JSON.parse(JSON.stringify(filters))
  }

  setSelectedFiltersHistory(history: SelectedFiltersType[]) {
    this.selectedFiltersHistory = JSON.parse(JSON.stringify(history))
  }
}

export default new FilterStore()
