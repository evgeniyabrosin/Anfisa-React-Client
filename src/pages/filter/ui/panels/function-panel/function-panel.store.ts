import { makeAutoObservable } from 'mobx'

import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import {
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'

class FunctionPanelStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get variants(): string[] {
    const { variants } = filterStore.statFuncData
    return variants
  }

  public get filterName(): string {
    return filterStore.selectedGroupItem.name
  }

  public get filterGroup(): string {
    return filterStore.selectedGroupItem.vgroup
  }

  public getCachedValues<T>(componentName: string): T {
    return filterStore.readFilterCondition(componentName) as T
  }

  public setCachedValues<T>(componentName: string, cachedValues: T): void {
    filterStore.setFilterCondition<T>(componentName, cachedValues)
  }

  public clearCachedValues(componentName: string): void {
    filterStore.clearFilterCondition(componentName)
  }

  public async applyConditions(conditions: TFuncCondition): Promise<void> {
    await datasetStore.setConditionsAsync([conditions])
  }

  public addSelectedFilters(variant: TVariant): void {
    filterStore.addSelectedFilters({
      group: this.filterGroup,
      groupItemName: this.filterName,
      variant: variant,
    })
  }

  public handleSumbitConditions(
    conditions: TFuncCondition,
    variant: TVariant,
  ): void {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    this.applyConditions(conditions)

    this.addSelectedFilters(variant)

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }
  }

  public fetchStatFunc(componentName: string, params: string): void {
    filterStore.fetchStatFuncAsync(componentName, params)
  }
}

export default new FunctionPanelStore()
