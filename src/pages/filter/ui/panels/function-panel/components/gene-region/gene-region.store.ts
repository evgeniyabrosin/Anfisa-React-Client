import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import functionPanelStore from '../../function-panel.store'

class GeneRegionStore {
  private _locusValue: string = ''
  private _currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public get locusValue(): string {
    return this._locusValue
  }

  public get currentMode(): ModeTypes | undefined {
    return this._currentMode
  }

  public setLocusValue(locusValue: string) {
    this._locusValue = locusValue
  }

  public resetLocusValue() {
    this._locusValue = ''
  }

  public setCurrentMode(modeType?: ModeTypes): void {
    if (!modeType) {
      this._currentMode = undefined
    }

    if (this.currentMode === modeType) {
      this.resetCurrentMode()

      return
    }

    this._currentMode = modeType
  }

  public resetCurrentMode(): void {
    this._currentMode = undefined
  }

  public get selectedFilterValue(): string {
    return `{"locus":"${this.locusValue}"}`
  }

  public handleSumbitCondtions(): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.GeneRegion,
      getConditionJoinMode(this.currentMode),
      ['True'],
      { locus: this.locusValue },
    ]

    functionPanelStore.submitConditions(conditions)

    this.resetLocusValue()
    filterStore.resetStatFuncData()
  }
}

export default new GeneRegionStore()
