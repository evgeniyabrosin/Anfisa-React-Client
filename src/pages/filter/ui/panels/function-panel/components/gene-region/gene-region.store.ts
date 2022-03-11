import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import functionPanelStore from '../../function-panel.store'
import { IGeneRegionCachedValues } from './../../function-panel.interface'

class GeneRegionStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get cachedValues(): IGeneRegionCachedValues {
    return functionPanelStore.getCachedValues<IGeneRegionCachedValues>(
      FuncStepTypesEnum.GeneRegion,
    )
  }

  public get locusValue(): string {
    return this.cachedValues?.conditions.locus || ''
  }

  public get selectedFilterValue(): string {
    return `{"locus":"${this.locusValue}"}`
  }

  public setConditions = (value: string): void => {
    functionPanelStore.setCachedValues(FuncStepTypesEnum.GeneRegion, {
      conditions: { locus: value },
    })
  }

  public handleSumbitCondtions(): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.GeneRegion,
      ConditionJoinMode.OR,
      ['True'],
      { locus: this.locusValue },
    ]

    const variant: TVariant = [`{"locus":"${this.locusValue}"}`, 0]

    functionPanelStore.sumbitConditions(conditions, variant)
  }
}

export default new GeneRegionStore()
