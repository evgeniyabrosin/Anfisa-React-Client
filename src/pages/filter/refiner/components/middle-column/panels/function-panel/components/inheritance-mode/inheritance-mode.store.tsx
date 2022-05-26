import { ChangeEvent } from 'react'
import { makeAutoObservable } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import functionPanelStore from '../../function-panel.store'

class InheritanceModeStore {
  private _problemGroupValues: string[] = []
  private _variantValues: string[] = []
  private _currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public get problemGroupValues(): string[] {
    return this._problemGroupValues
  }

  public get variantValues(): string[] {
    return this._variantValues
  }

  public get currentMode(): ModeTypes | undefined {
    return this._currentMode
  }

  public setProblemGroupValues(problemGroupValues: string[]) {
    this._problemGroupValues = problemGroupValues
  }

  public setVariantValues(variantValues: string[]) {
    this._variantValues = variantValues
  }

  public resetVariantValues() {
    this._variantValues = []
  }

  public setCurrentMode = (modeType?: ModeTypes) => {
    if (!modeType || this.currentMode === modeType) {
      this._currentMode = undefined

      return
    }

    this._currentMode = modeType
  }

  public resetCurrentMode(): void {
    this._currentMode = undefined
  }

  public resetProblemGroupValues() {
    this._problemGroupValues = []
  }

  public get selectedFilterValue(): string {
    return this.variantValues.toString()
  }

  public updateProblemGroupValues(
    e: ChangeEvent<HTMLInputElement>,
    problemGroup: string,
  ): void {
    this.resetVariantValues()

    const problemGroups = e.target.checked
      ? [...this.problemGroupValues, problemGroup]
      : this.problemGroupValues.filter(
          (group: string) => group !== problemGroup,
        )
    this.setProblemGroupValues(problemGroups)
  }

  public updateVariantValues(
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ): void {
    const variants = e.target.checked
      ? [...this.variantValues, variantName]
      : this.variantValues.filter(
          (variantValue: string) => variantValue !== variantName,
        )

    this.setVariantValues(variants)
  }

  public selectAllVariants = (): void => {
    if (functionPanelStore.filteredComplexVariants.length === 0) return

    const { selectedCondition } = filterStore

    const variantsValues = selectedCondition
      ? functionPanelStore.complexVariants.map(variant => variant[0])
      : functionPanelStore.filteredComplexVariants.map(variant => variant[0])

    this.setVariantValues(variantsValues)
  }

  public resetAllFields = (): void => {
    this.resetProblemGroupValues()
    this.resetVariantValues()
  }

  public clearAllVariants(variantsValues: string[]): void {
    if (variantsValues.length === 0) return

    this.resetVariantValues()
  }

  public handleSumbitCondtions = () => {
    const conditions: TFuncCondition = [
      FilterKindEnum.Func,
      FuncStepTypesEnum.InheritanceMode,
      getConditionJoinMode(this.currentMode),
      this.variantValues,
      {
        problem_group:
          this.problemGroupValues.length > 0 ? this.problemGroupValues : [],
      },
    ]

    functionPanelStore.submitConditions(conditions)

    filterStore.resetStatFuncData()
    filterStore.setTouched(false)
    this.resetAllFields()
  }
}

export default new InheritanceModeStore()
