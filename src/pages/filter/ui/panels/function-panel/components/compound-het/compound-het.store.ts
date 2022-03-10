import { Option } from 'react-dropdown'
import { makeAutoObservable, runInAction } from 'mobx'

import { IStatFuncData } from '@declarations'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import functionPanelStore from '../../function-panel.store'
import { ICompoundHetCachedValues } from './../../function-panel.interface'

export const CompoundHetSelectOptions = [
  { label: 'shared transcript', value: '' },
  { label: 'shared gene', value: 'gene' },
  { label: 'non-intersecting transcripts', value: 'rough' },
]

class CompoundHetStore {
  statFuncStatus = ''

  constructor() {
    makeAutoObservable(this)
  }

  public get cachedValues(): ICompoundHetCachedValues {
    return functionPanelStore.getCachedValues<ICompoundHetCachedValues>(
      FuncStepTypesEnum.CompoundHet,
    )
  }

  public get initialApprox(): string {
    return (
      this.cachedValues?.conditions.approx || CompoundHetSelectOptions[0].value
    )
  }

  public async getStatFuncStatusAsync(): Promise<void> {
    const statFuncData: IStatFuncData = await filterStore.fetchStatFuncAsync(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx: this.cachedValues?.conditions.approx || null,
        state: null,
      }),
    )

    runInAction(() => {
      this.statFuncStatus = statFuncData.err || ''
    })
  }

  public setConditions(approx: string | null, variants?: string[]): void {
    functionPanelStore.setCachedValues<ICompoundHetCachedValues>(
      FuncStepTypesEnum.GeneRegion,
      {
        conditions: { approx: approx, state: null },
        variants: variants || ['Proband'],
      },
    )
  }

  public handleChangeApprox(arg: Option): void {
    const approx = !arg.value ? null : arg.value

    this.setConditions(approx)

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
      ConditionJoinMode.OR,
      ['Proband'],
      { approx: this.cachedValues?.conditions.approx || null, state: null },
    ]

    const variant: TVariant = ['Proband', 0]

    functionPanelStore.handleSumbitConditions(conditions, variant)
  }

  public handleResetFields(): void {
    this.setConditions('shared transcript')

    functionPanelStore.clearCachedValues(FuncStepTypesEnum.CompoundHet)
  }
}

export default new CompoundHetStore()