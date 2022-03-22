import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { nanoid } from 'nanoid'

import { IStatFuncData, StatListType } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { getApiUrl } from '@core/get-api-url'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControlOptions } from '@pages/filter/ui/filter-control/filter-control.const'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { TCondition } from './../service-providers/common/common.interface'
import datasetStore from './dataset'

export type SelectedFiltersType = Record<
  string,
  Record<string, Record<string, number>>
>

export interface IRemoveFilter {
  filterId: string
  subFilterIdx: number
  filterType: string
}

export class FilterStore {
  method!: GlbPagesNames | FilterControlOptions
  selectedGroupItem: StatListType = {}
  dtreeSet: any = {}

  private _selectedFilters = new Map<string, TCondition>()

  actionName?: ActionFilterEnum
  statFuncData: any = []
  filterCondition: Record<string, any> = {}
  memorizedSelectedFilters: SelectedFiltersType | undefined | any = undefined

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

  public get selectedFiltersArray(): [string, TCondition][] {
    return Array.from(this._selectedFilters)
  }

  public get conditions() {
    return toJS(Array.from(toJS(this._selectedFilters.values())))
  }

  public addFilterBlock(condition: TCondition): void {
    const filterId: string = nanoid()

    this._selectedFilters.set(filterId, condition)
  }

  // public removeFilterBlock(filterBlockName: string): void {
  //   // const id = this.selectedFiltersMapAsArray.reverse().map(filter => {
  //   //   if (filter[1][1] === filterBlockName) return filter[0]
  //   // })
  // }

  public addFilterToFilterBlock(condition: TCondition): void {
    const filterId: string = nanoid()

    this._selectedFilters.set(filterId, condition)
  }

  public removeFilterFromFilterBlock({
    filterId,
    subFilterIdx,
    filterType,
  }: IRemoveFilter): void {
    const currentCondition = this._selectedFilters.get(filterId)!

    if (
      filterType === FilterKindEnum.Numeric ||
      currentCondition[3]?.length === 1
    ) {
      this._selectedFilters.delete(filterId)
      return
    }

    currentCondition[3] = currentCondition[3]?.filter(
      (_filter, idx) => idx !== subFilterIdx,
    )
  }

  async fetchDsInfoAsync() {
    return await datasetProvider.getDsInfo({ ds: datasetStore.datasetName })
  }

  async fetchProblemGroupsAsync() {
    const dsInfo = await this.fetchDsInfoAsync()

    return dsInfo.meta.samples
  }

  async fetchStatFuncAsync(unit: string, param?: any) {
    const conditions = JSON.stringify(this.conditions)

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
    this.resetSelectedFilters()
  }

  resetSelectedFilters() {
    this._selectedFilters = new Map()
  }

  resetStatFuncData() {
    this.statFuncData = []
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
    this.memorizedSelectedFilters = this._selectedFilters
  }

  applyMemorizedFilters() {
    if (this.memorizedSelectedFilters) {
      this._selectedFilters = this.memorizedSelectedFilters
    }
  }
}

export default new FilterStore()
