import { makeAutoObservable, toJS } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { getSelectValue } from '@utils/function-panel/getSelectValue'
import { getStringScenario } from '@utils/function-panel/getStringScenario'
import { getSortedArray } from '@utils/getSortedArray'
import {
  ICustomInheritanceModeCachedValues,
  TScenario,
} from '../../function-panel.interface'
import functionPanelStore from '../../function-panel.store'

interface IConditions {
  arrayScenario: TScenario[]
  resetName?: string
}

interface ISendRequest {
  complexScenario?: [string, string][]
  resetName?: string
  selectType?: string
  selectValue?: string
}

class CustomInheritanceModeStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get cachedValues(): ICustomInheritanceModeCachedValues {
    return toJS(
      functionPanelStore.getCachedValues<ICustomInheritanceModeCachedValues>(
        FuncStepTypesEnum.CustomInheritanceMode,
      ),
    )
  }

  public get scenario() {
    return this.cachedValues?.conditions.scenario || {}
  }

  public get reset() {
    return this.cachedValues?.reset || ''
  }

  public get stringScenario() {
    return this.cachedValues ? getStringScenario(this.scenario) : ''
  }

  public get firstSelectValue() {
    return this.cachedValues
      ? getSelectValue(this.scenario, functionPanelStore.problemGroups[0])
      : ''
  }

  public get secondSelectValue() {
    return this.cachedValues
      ? getSelectValue(this.scenario, functionPanelStore.problemGroups[1])
      : ''
  }

  public get thirdSelectValue() {
    return this.cachedValues
      ? getSelectValue(this.scenario, functionPanelStore.problemGroups[2])
      : ''
  }

  public get selectStates() {
    return [
      this.firstSelectValue,
      this.secondSelectValue,
      this.thirdSelectValue,
    ]
  }

  // scenario creation step by step
  public setSingleScenario(group: string, selectValue: string): void {
    if (group === functionPanelStore.problemGroups[0]) {
      this.sendRequestAsync({
        selectType: 'first',
        selectValue,
      })
    }

    if (group === functionPanelStore.problemGroups[1]) {
      this.sendRequestAsync({
        selectType: 'second',
        selectValue,
      })
    }

    if (group === functionPanelStore.problemGroups[2]) {
      this.sendRequestAsync({
        selectType: 'third',
        selectValue,
      })
    }
  }

  // complex scenario creation
  public setComplexScenario(resetName: string): void {
    const problemGroups = functionPanelStore.problemGroups

    if (resetName === InheritanceModeEnum.HomozygousRecessive_XLinked) {
      const complexScenario: any[] = [
        ['2', problemGroups[0]],
        ['0-1', problemGroups[1]],
        ['0-1', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }

    if (resetName === InheritanceModeEnum.AutosomalDominant) {
      const complexScenario: any[] = [
        ['1-2', problemGroups[0]],
        ['0', problemGroups[1]],
        ['0', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }

    if (resetName === InheritanceModeEnum.Compensational) {
      const complexScenario: any[] = [
        ['0', problemGroups[0]],
        ['1-2', problemGroups[1]],
        ['1-2', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }

    if (resetName === 'empty') {
      const complexScenario: any[] = [
        ['--', problemGroups[0]],
        ['--', problemGroups[1]],
        ['--', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }
  }

  // cach values
  public setConditions({ arrayScenario, resetName }: IConditions): void {
    functionPanelStore.setCachedValues<ICustomInheritanceModeCachedValues>(
      FuncStepTypesEnum.CustomInheritanceMode,
      {
        conditions: { scenario: arrayScenario },
        reset: resetName || this.reset,
      },
    )
  }

  // root function to update data
  public sendRequestAsync = async ({
    selectType,
    selectValue,
    complexScenario,
    resetName,
  }: ISendRequest) => {
    let selectiveData: any[] = []

    if (selectType && selectValue) {
      selectiveData = [
        [
          selectType === 'first' ? selectValue : this.firstSelectValue || '--',
          functionPanelStore.problemGroups[0],
        ],
        [
          selectType === 'second'
            ? selectValue
            : this.secondSelectValue || '--',
          functionPanelStore.problemGroups[1],
        ],
        [
          selectType === 'third' ? selectValue : this.thirdSelectValue || '--',
          functionPanelStore.problemGroups[2],
        ],
      ]
    }

    const arrayScenario = getSortedArray(complexScenario || selectiveData)

    const stringScenario = getStringScenario(arrayScenario)

    const params = `{"scenario":{${stringScenario}}}`

    this.setConditions({ arrayScenario, resetName })

    functionPanelStore.fetchStatFunc('Custom_Inheritance_Mode', params)
  }

  public handleSumbitCondtions(): void {
    const custInhModeConditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CustomInheritanceMode,
      ConditionJoinMode.OR,
      ['True'],
      JSON.parse(`{"scenario":{${this.stringScenario}}}`),
    ]

    const variant: TVariant = [`"scenario": ${this.stringScenario}`, 0]

    functionPanelStore.handleSumbitConditions(custInhModeConditions, variant)
  }
}

export default new CustomInheritanceModeStore()
