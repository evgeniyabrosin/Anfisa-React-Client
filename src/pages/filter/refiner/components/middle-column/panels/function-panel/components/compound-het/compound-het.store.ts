import { makeAutoObservable, runInAction } from 'mobx'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getApproxValue } from '@utils/getApproxValue'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import functionPanelStore from '../../function-panel.store'

class CompoundHetStore {
  public statFuncStatus = ''
  public approx = datasetStore.isXL
    ? ApproxNameTypes.Non_Intersecting_Transcript
    : ApproxNameTypes.Shared_Gene
  public currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setApprox = (approx: ApproxNameTypes) => {
    this.approx = approx
  }

  public resetApprox() {
    this.approx = datasetStore.isXL
      ? ApproxNameTypes.Non_Intersecting_Transcript
      : ApproxNameTypes.Shared_Gene
  }

  public setCurrentMode(modeType?: ModeTypes): void {
    if (!modeType || this.currentMode === modeType) {
      this.currentMode = undefined

      return
    }

    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public async getStatFuncStatusAsync(): Promise<void> {
    const statFuncData = await filterStore.fetchStatFuncAsync(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx: datasetStore.isXL ? null : getApproxValue(this.approx),
        state: null,
      }),
    )

    runInAction(() => {
      this.statFuncStatus = statFuncData.err || ''
    })
  }

  public handleSumbitCondtions(): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CompoundHet,
      getConditionJoinMode(this.currentMode),
      ['Proband'],
      { approx: datasetStore.isXL ? null : getApproxValue(this.approx) },
    ]

    functionPanelStore.submitConditions(conditions)

    filterStore.resetStatFuncData()
    this.resetApprox()
  }

  public handleResetFields(): void {
    this.resetApprox()
  }
}

export default new CompoundHetStore()
