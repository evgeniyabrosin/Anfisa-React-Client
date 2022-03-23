import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, runInAction } from 'mobx'
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
  private _selectedFilters = new Map<string, TCondition>()

  method!: GlbPagesNames | FilterControlOptions
  selectedGroupItem: StatListType = {}

  actionName?: ActionFilterEnum
  statFuncData: any = []
  filterCondition: Record<string, any> = {}
  memorizedSelectedFilters: SelectedFiltersType | undefined | any = undefined

  selectedFiltersHistory: SelectedFiltersType[] = []

  activeFilterId: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  public setActiveFilterId(filterId: string) {
    this.activeFilterId = filterId
  }

  public resetActiveFilterId() {
    this.activeFilterId = ''
  }

  public setActionName(actionName?: ActionFilterEnum) {
    this.actionName = actionName
  }

  public resetActionName() {
    this.actionName = undefined
  }

  public setMethod(method: GlbPagesNames | FilterControlOptions) {
    this.method = method
  }

  setSelectedGroupItem(item: StatListType) {
    this.selectedGroupItem = item
  }

  public get selectedFiltersArray(): [string, TCondition][] {
    return Array.from(this._selectedFilters)
  }

  public get conditions() {
    return Array.from(this._selectedFilters.values())
  }

  public addFilterBlock(condition: TCondition): void {
    const filterId: string = nanoid()

    this._selectedFilters.set(filterId, condition)

    this.setActiveFilterId(filterId)
  }

  public removeFilterBlock(filterId: string): void {
    this._selectedFilters.delete(filterId)

    datasetStore.fetchDsStatAsync()
  }

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

  public async fetchDsInfoAsync() {
    return await datasetProvider.getDsInfo({ ds: datasetStore.datasetName })
  }

  public async fetchProblemGroupsAsync() {
    const dsInfo = await this.fetchDsInfoAsync()

    return dsInfo.meta.samples
  }

  public async fetchStatFuncAsync(unit: string, param?: any) {
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

  public resetData() {
    this.method = GlbPagesNames.Filter
    this.selectedGroupItem = {}
    this.resetSelectedFilters()
  }

  public resetSelectedFilters() {
    this._selectedFilters = new Map()
  }

  public resetStatFuncData() {
    this.statFuncData = []
  }

  public setSelectedFiltersHistory(history: SelectedFiltersType[]) {
    this.selectedFiltersHistory = JSON.parse(JSON.stringify(history))
  }

  public setFilterCondition<T = any>(filterName: string, values: T) {
    this.filterCondition[filterName] = cloneDeep(values)
  }

  public readFilterCondition<T = any>(filterName: string) {
    return this.filterCondition[filterName]
      ? (this.filterCondition[filterName] as T)
      : undefined
  }

  public resetFilterCondition() {
    this.filterCondition = {}
  }

  public clearFilterCondition(filterName: string, subFilterName?: string) {
    subFilterName
      ? delete this.filterCondition[filterName][subFilterName]
      : delete this.filterCondition[filterName]
  }

  public memorizeSelectedFilters() {
    this.memorizedSelectedFilters = this._selectedFilters
  }

  public applyMemorizedFilters() {
    if (this.memorizedSelectedFilters) {
      this._selectedFilters = this.memorizedSelectedFilters
    }
  }
}

export default new FilterStore()
