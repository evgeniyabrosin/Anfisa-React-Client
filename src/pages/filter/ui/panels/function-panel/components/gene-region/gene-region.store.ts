import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import {
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { getModeType } from '@utils/getModeType'
import functionPanelStore from '../../function-panel.store'
import { IGeneRegionCachedValues } from './../../function-panel.interface'

class GeneRegionStore {
  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentMode(modeType: ModeTypes): void {
    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
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
      getModeType(this.currentMode),
      ['True'],
      { locus: this.locusValue },
    ]

    const variant: TVariant = [`{"locus":"${this.locusValue}"}`, 0]

    functionPanelStore.sumbitConditions(conditions, variant, this.currentMode)
  }
}

export default new GeneRegionStore()
