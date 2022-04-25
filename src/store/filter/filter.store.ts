import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterPresetsStore from '@store/filter-presets'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControlOptions } from '@pages/filter/ui/filter-control/filter-control.const'
import { TCondition, TPropertyStatus } from '@service-providers/common'
import { IStatfuncArguments } from '@service-providers/filtering-regime'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'
import { showToast } from '@utils/notifications'
import { FilterStatStore, TFilterStatQuery } from './filter-stat.store'

enum PresetModifiedState {
  NotPreset = 'NotPreset',
  NotModified = 'NotModified',
  Modified = 'Modified',
}

export class FilterStore {
  readonly initialStat = new FilterStatStore()
  readonly filteredStat = new FilterStatStore()

  // TODO: it's not good choice to save current page as store field
  method!: GlbPagesNames | FilterControlOptions

  statFuncData: any = []

  private _conditions: TCondition[] = []
  private _isConditionsFetching = false
  private _selectedConditionIndex: number = -1
  private _attributeNameToAdd: string = ''
  private _presetModifiedState: PresetModifiedState =
    PresetModifiedState.NotPreset

  constructor() {
    makeAutoObservable(this)

    // TODO: temporary for avoid circular references
    datasetStore.getConditions = () => this.conditions

    reaction(
      () => this.datasetName,
      datasetName => {
        this.clearConditions()
        if (datasetName) {
          this.initialStat.setQuery({ datasetName })
        } else {
          this.initialStat.reset()
        }
      },
    )

    reaction(
      () => this.filterQuery,
      query => {
        this.setPresetModifiedState()

        if (query.datasetName && query.conditions?.length) {
          this.filteredStat.setQuery(query)
        } else {
          this.filteredStat.reset()
        }

        // TODO: refactoring: remove it (main table store should control ws_list data)
        if (
          !datasetStore.isXL &&
          query.datasetName &&
          this.method === GlbPagesNames.Refiner
        ) {
          datasetStore.fetchWsListAsync()
        }
      },
    )

    reaction(
      () => filterPresetsStore.activePreset,
      presetName => {
        if (presetName) {
          this.loadPreset(presetName)
        } else {
          this.setPresetModifiedState(PresetModifiedState.NotPreset)
        }
      },
    )
  }

  public get datasetName(): string {
    return datasetStore.datasetName
  }

  public get stat(): FilterStatStore {
    return this.isConditionsEmpty ? this.initialStat : this.filteredStat
  }

  public get selectedConditionIndex(): number {
    return this._selectedConditionIndex
  }

  public get attributeNameToAdd(): string {
    return this._attributeNameToAdd
  }

  public get isRedactorMode(): boolean {
    return this._selectedConditionIndex >= 0
  }

  public get selectedAttributeStatus(): TPropertyStatus | undefined {
    if (this.isRedactorMode) {
      const activeFilter = this._conditions[this._selectedConditionIndex]

      if (activeFilter) {
        return this.initialStat.getAttributeStatusByName(activeFilter[1])
      }
    } else if (this.attributeNameToAdd) {
      return this.stat.getAttributeStatusByName(this.attributeNameToAdd)
    }

    return undefined
  }

  public get conditions(): ReadonlyArray<TCondition> {
    return this._conditions
  }

  public get isConditionsFetching(): boolean {
    return this._isConditionsFetching
  }

  public get isConditionsEmpty(): boolean {
    return !this._conditions.length
  }

  public get selectedCondition(): TCondition | undefined {
    return this._conditions[this._selectedConditionIndex]
  }

  public get isPresetModified(): boolean {
    return this._presetModifiedState === PresetModifiedState.Modified
  }

  public addCondition(condition: TCondition): number {
    this._conditions.push(condition)

    return this._conditions.length - 1
  }

  public removeCondition(index: number): void {
    this._conditions.splice(index, 1)

    if (this._selectedConditionIndex === index) {
      this._selectedConditionIndex = -1
    }
  }

  public replaceCondition(index: number, condition: TCondition): number {
    this._conditions[index] = condition

    return index
  }

  public saveCurrentCondition(condition: TCondition): void {
    const savedIndex = this.isRedactorMode
      ? this.replaceCondition(this._selectedConditionIndex, condition)
      : this.addCondition(condition)

    this.selectCondition(savedIndex)
  }

  // TODO: why it's here?
  async fetchStatFuncAsync(unit: string, param: any) {
    const body: IStatfuncArguments = {
      ds: datasetStore.datasetName,
      conditions: this.conditions,
      rq_id: String(Date.now()),
      unit,
      param,
    }

    const result = await filteringRegimeProvider.getStatFunc(body)

    runInAction(() => {
      this.statFuncData = result
    })

    return result
  }

  public resetStatFuncData() {
    this.statFuncData = []
  }

  public reset() {
    this.method = GlbPagesNames.Filter
    this._attributeNameToAdd = ''
    this.clearConditions()
  }

  public clearConditions() {
    this._conditions.splice(0)
    this._selectedConditionIndex = -1
  }

  public selectCondition(index: number) {
    this._selectedConditionIndex = index
    this._attributeNameToAdd = ''
  }

  public setAttributeToAdd(attrName: string) {
    this._selectedConditionIndex = -1
    this._attributeNameToAdd = attrName
  }

  public setMethod(method: GlbPagesNames | FilterControlOptions) {
    this.method = method
  }

  public joinPresetConditions(presetName: string) {
    const conditions = toJS(this.conditions)

    this.updateConditions(
      () =>
        filteringRegimeProvider
          .joinFilterPreset({
            ds: this.datasetName,
            conditions,
            presetName,
          })
          .then(response => {
            this.setConditions(response.conditions)
          }),
      t('filter.errors.joinPreset', { presetName }),
    )
  }

  private get filterQuery(): TFilterStatQuery {
    return {
      datasetName: this.datasetName,
      conditions: toJS(this.conditions),
    }
  }

  private setPresetModifiedState(state?: PresetModifiedState): void {
    if (state === undefined) {
      if (this._presetModifiedState === PresetModifiedState.NotModified) {
        this._presetModifiedState = PresetModifiedState.Modified
        filterPresetsStore.resetActivePreset()
      }
    } else if (state !== this._presetModifiedState) {
      this._presetModifiedState = state
    }
  }

  private setConditions(conditions: ReadonlyArray<TCondition>): void {
    this._selectedConditionIndex = -1
    this._attributeNameToAdd = ''
    this._conditions = cloneDeep(conditions) as TCondition[]
  }

  private updateConditions(
    updater: () => Promise<void>,
    errorMessage: string,
  ): void {
    this._attributeNameToAdd = ''
    this._isConditionsFetching = true

    updater()
      .catch(() => {
        showToast(errorMessage, 'error')
      })
      .finally(() => {
        runInAction(() => {
          this._isConditionsFetching = false
        })
      })
  }

  private loadPreset(presetName: string): void {
    this.updateConditions(
      () =>
        filteringRegimeProvider
          .getDsStat({
            ds: this.datasetName,
            filter: presetName,
          })
          .then(response => {
            this.setPresetModifiedState(PresetModifiedState.NotPreset)
            this.setConditions(response.conditions)
            this.setPresetModifiedState(PresetModifiedState.NotModified)
          }),
      t('filter.errors.loadPreset', { presetName }),
    )
  }
}
