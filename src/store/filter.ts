import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { TVariant } from 'service-providers/common/common.interface'

import { IStatFuncData, StatListType } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { getApiUrl } from '@core/get-api-url'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControlOptions } from '@pages/filter/ui/filter-control/filter-control.const'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import datasetStore from './dataset'

export type SelectedFiltersType = Record<
  string,
  Record<string, Record<string, number>>
>

interface AddSelectedFiltersI {
  group: string
  groupItemName: string
  variant: TVariant
  modeType?: ModeTypes | string
}

export class FilterStore {
  method!: GlbPagesNames | FilterControlOptions
  selectedGroupItem: StatListType = {}
  dtreeSet: any = {}
  selectedFilters: SelectedFiltersType = {}
  actionName?: ActionFilterEnum
  statFuncData: any = []
  filterCondition: Record<string, any> = {}
  memorizedSelectedFilters: SelectedFiltersType | undefined = undefined

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

  setMethod(method: GlbPagesNames | FilterControlOptions) {
    this.method = method
  }

  setSelectedGroupItem(item: StatListType) {
    this.selectedGroupItem = item
  }

  addSelectedFilters({
    group,
    groupItemName,
    variant,
    modeType,
  }: AddSelectedFiltersI) {
    if (!this.selectedFilters[group]) {
      this.selectedFilters[group] = {}
    }

    if (!this.selectedFilters[group][groupItemName]) {
      this.selectedFilters[group][groupItemName] = {}
    }

    if (variant) {
      this.selectedFilters[group][groupItemName][variant[0]] = variant[1]
    }

    if (modeType) {
      this.selectedFilters[group][groupItemName][modeType] = 1
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
    variants: any[],
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
    return await datasetProvider.getDsInfo({ ds: datasetStore.datasetName })
  }

  async fetchProblemGroupsAsync() {
    const dsInfo = await this.fetchDsInfoAsync()

    return dsInfo.meta.samples
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

    const response = await fetch(getApiUrl('statfunc'), {
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

  resetData() {
    this.method = GlbPagesNames.Filter
    this.selectedGroupItem = {}
    this.dtreeSet = {}
    this.selectedFilters = {}
  }

  resetStatFuncData() {
    this.statFuncData = []
  }

  setSelectedFilters(filters: SelectedFiltersType) {
    this.selectedFilters = JSON.parse(JSON.stringify(filters))
  }

  setSelectedFiltersHistory(history: SelectedFiltersType[]) {
    this.selectedFiltersHistory = JSON.parse(JSON.stringify(history))
  }

  setFilterCondition<T = any>(filterName: string, values: T) {
    this.filterCondition[filterName] = cloneDeep(values)
  }

  readFilterCondition<T = any>(filterName: string) {
    return this.filterCondition[filterName]
      ? (this.filterCondition[filterName] as T)
      : undefined
  }

  resetFilterCondition() {
    this.filterCondition = {}
  }

  clearFilterCondition(filterName: string, subFilterName?: string) {
    subFilterName
      ? delete this.filterCondition[filterName][subFilterName]
      : delete this.filterCondition[filterName]
  }

  memorizeSelectedFilters() {
    this.memorizedSelectedFilters = toJS(this.selectedFilters)
  }

  applyMemorizedFilters() {
    if (this.memorizedSelectedFilters) {
      this.selectedFilters = this.memorizedSelectedFilters
    }
  }
}

export default new FilterStore()
