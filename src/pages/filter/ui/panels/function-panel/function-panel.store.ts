import { makeAutoObservable, toJS } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getQueryBuilder } from '@utils/getQueryBuilder'

export const approxOptions = [
  'shared transcript',
  'shared gene',
  'non-intersecting transcripts',
]

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
    return filterStore.selectedGroupItem.name
  }

  public get filterGroup(): string {
    return filterStore.selectedGroupItem.vgroup
  }

  public get problemGroups(): string[] {
    let attrData: any

    const statList = toJS(datasetStore.startDsStat['stat-list'])
    const subGroups = Object.values(getQueryBuilder(statList))

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === FuncStepTypesEnum.CustomInheritanceMode) {
          attrData = subGroup[currNo]
        }
      })
    })

    return attrData.family
  }

  public sumbitConditions(condition: TFuncCondition): void {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    filterStore.isRedactorMode
      ? filterStore.addFilterToFilterBlock(condition)
      : filterStore.addFilterBlock(condition)
  }

  public fetchStatFunc(componentName: string, params: string) {
    return filterStore.fetchStatFuncAsync(componentName, params)
  }
}

export default new FunctionPanelStore()
