import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import {
  IFuncPropertyStatus,
  TFuncCondition,
} from '@service-providers/common/common.interface'

class FunctionPanelStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get simpleVariants(): string[] {
    const { variants } = filterStore.statFuncData
    return variants
  }

  public get complexVariants(): [string, number][] {
    const { variants } = filterStore.statFuncData
    return variants || []
  }

  public get filteredComplexVariants(): [string, number][] {
    return this.complexVariants.filter(([, variantValue]) => variantValue > 0)
  }

  public get filterName(): string {
    return filterStore.selectedAttributeStatus?.name ?? ''
  }

  public get filterGroup(): string {
    return filterStore.selectedAttributeStatus?.vgroup ?? ''
  }

  public get problemGroups(): string[] {
    return (
      (
        filterStore.initialStat.getAttributeStatusByName(
          FuncStepTypesEnum.CustomInheritanceMode,
        ) as IFuncPropertyStatus | undefined
      )?.family ?? []
    )
  }

  public submitConditions(condition: TFuncCondition): void {
    filterStore.saveCurrentCondition(condition)
  }

  public fetchStatFunc(componentName: string, params: string) {
    return filterStore.fetchStatFuncAsync(componentName, params)
  }
}

export default new FunctionPanelStore()
