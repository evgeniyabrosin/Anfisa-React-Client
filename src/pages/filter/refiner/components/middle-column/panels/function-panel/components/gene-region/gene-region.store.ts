import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import functionPanelStore from '../../function-panel.store'

class GeneRegionStore {
  private _currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public get currentMode(): ModeTypes | undefined {
    return this._currentMode
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

  public handleSumbitCondtions(locusValue: string): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.GeneRegion,
      getConditionJoinMode(this.currentMode),
      ['True'],
      { locus: locusValue },
    ]

    functionPanelStore.submitConditions(conditions)

    filterStore.resetStatFuncData()
  }
}

export default new GeneRegionStore()