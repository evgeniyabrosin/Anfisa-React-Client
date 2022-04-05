import { ChangeEvent } from 'react'
import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import { IInheritanceModeCachedValues } from '../../function-panel.interface'
import functionPanelStore from '../../function-panel.store'

class InheritanceModeStore {
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

  public get cachedValues(): IInheritanceModeCachedValues {
    return functionPanelStore.getCachedValues<IInheritanceModeCachedValues>(
      FuncStepTypesEnum.InheritanceMode,
    )
  }

  public get problemGroupValues(): string[] {
    return this.cachedValues?.conditions.problem_group || []
  }

  public get variantsValues(): string[] {
    return this.cachedValues?.variants || []
  }

  public get selectedFilterValue(): string {
    return this.variantsValues.toString()
  }

  public handleChangeProblemGroups(
    e: ChangeEvent<HTMLInputElement>,
    problemGroup: string,
  ): void {
    const problemGroups = e.target.checked
      ? [...this.problemGroupValues, problemGroup]
      : this.problemGroupValues.filter(
          (group: string) => group !== problemGroup,
        )

    this.setConditions({ problemGroups })
  }

  public handleChangeVariants(
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ): void {
    const variants = e.target.checked
      ? [...this.variantsValues, variantName]
      : this.variantsValues.filter(
          (variantValue: string) => variantValue !== variantName,
        )
    this.setConditions({
      variants,
    })
  }

  public handleSelectAllVariants(problemGroupValues: string[]): void {
    if (functionPanelStore.filteredComplexVariants.length === 0) return

    const variantsGroup = functionPanelStore.filteredComplexVariants.map(
      variant => variant[0],
    )

    functionPanelStore.setCachedValues<IInheritanceModeCachedValues>(
      FuncStepTypesEnum.InheritanceMode,
      {
        conditions: { problem_group: problemGroupValues },
        variants: variantsGroup,
      },
    )
  }

  public handleResetAllFieldsLocally(problemGroupValues: string[]): void {
    if (problemGroupValues.length === 0) return

    functionPanelStore.clearCachedValues(FuncStepTypesEnum.InheritanceMode)
    this.resetCurrentMode()
  }

  public handleResetVariantsLocally(variantsValues: string[]): void {
    if (variantsValues.length === 0) return

    functionPanelStore.clearCachedValues(
      FuncStepTypesEnum.InheritanceMode,
      'variants',
    )
  }

  public setConditions({
    problemGroups,
    variants,
  }: {
    problemGroups?: string[]
    variants?: string[]
  }): void {
    functionPanelStore.setCachedValues<IInheritanceModeCachedValues>(
      FuncStepTypesEnum.InheritanceMode,
      {
        conditions: {
          problem_group: problemGroups
            ? problemGroups
            : this.problemGroupValues,
        },
        variants: variants ? variants : [],
      },
    )

    problemGroups &&
      functionPanelStore.fetchStatFunc(
        FuncStepTypesEnum.InheritanceMode,
        JSON.stringify({
          problem_group: problemGroups || this.problemGroupValues,
        }),
      )
  }

  public handleSumbitCondtions = () => {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.InheritanceMode,
      getConditionJoinMode(this.currentMode),
      this.variantsValues,
      {
        problem_group:
          this.problemGroupValues.length > 0 ? this.problemGroupValues : null,
      },
    ]

    functionPanelStore.sumbitConditions(conditions)

    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.InheritanceMode,
      JSON.stringify({ problem_group: this.problemGroupValues }),
    )
  }
}

export default new InheritanceModeStore()
