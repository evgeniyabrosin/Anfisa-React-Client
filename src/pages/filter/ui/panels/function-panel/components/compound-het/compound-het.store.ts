import { Option } from 'react-dropdown'
import { makeAutoObservable, runInAction } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import functionPanelStore, { approxOptions } from '../../function-panel.store'

export const CompoundHetSelectOptions = [
  { label: 'shared transcript', value: '' },
  { label: 'shared gene', value: 'gene' },
  { label: 'non-intersecting transcripts', value: 'rough' },
]

class CompoundHetStore {
  private _statFuncStatus = ''
  private _initialApprox: string | null = ''
  private _currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public get statFuncStatus(): string {
    return this._statFuncStatus
  }
  public get initialApprox(): string | null {
    return this._initialApprox
  }
  public get currentMode(): ModeTypes | undefined {
    return this._currentMode
  }

  public setInitialApprox(initialApprox: string | null) {
    this._initialApprox = initialApprox
  }

  public resetInitialApprox() {
    this._initialApprox = ''
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

  public async getStatFuncStatusAsync(): Promise<void> {
    const statFuncData = await filterStore.fetchStatFuncAsync(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx: this.initialApprox ?? null,
        state: null,
      }),
    )

    runInAction(() => {
      this._statFuncStatus = statFuncData.err || ''
    })
  }

  public handleChangeApprox(arg: Option): void {
    const approx = !arg.value ? null : arg.value

    this.setInitialApprox(approx)

    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx,
        state: '',
      }),
    )
  }

  public handleSumbitCondtions(): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CompoundHet,
      getConditionJoinMode(this.currentMode),
      ['Proband'],
      { approx: this.initialApprox ?? null, state: null },
    ]

    functionPanelStore.sumbitConditions(conditions)

    filterStore.resetStatFuncData()
    this.resetInitialApprox()
  }

  public handleResetFields(): void {
    this.setInitialApprox(approxOptions[0])
  }
}

export default new CompoundHetStore()
