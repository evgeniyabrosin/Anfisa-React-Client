import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import { getFuncParams } from '@utils/getFuncParams'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import modalsVisibilityStore from '../../modals-visibility-store'

interface ISelectValues {
  first: string
  second: string
  third: string
}

interface ISendRequest {
  complexScenario?: [string, string][]
  type?: keyof ISelectValues
  value?: string
}

class ModalCustomInheritanceModeStore {
  selectValues: ISelectValues = {
    first: '--',
    second: '--',
    third: '--',
  }

  resetValue = ''

  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentMode(modeType?: ModeTypes) {
    if (!modeType || this.currentMode === modeType) {
      this.currentMode = undefined

      return
    }

    this.currentMode = modeType
  }

  public resetCurrentMode() {
    this.currentMode = undefined
  }

  public setSingleSelectValue(type: keyof ISelectValues, value: string): void {
    this.selectValues[type] = value
  }

  public setComplexSelectValues(complexValue: ISelectValues): void {
    this.selectValues = complexValue
  }

  public setResetValue(resetValue: string) {
    this.resetValue = resetValue
  }

  public sendRequest({ type, value, complexScenario }: ISendRequest): void {
    let selectedData: any[] = []

    const { problemGroups, groupName } = modalsControlStore

    if (type && value) {
      selectedData = [
        [type === 'first' ? value : this.selectValues.first, problemGroups[0]],
        [
          type === 'second' ? value : this.selectValues.second,
          problemGroups[1],
        ],
        [type === 'third' ? value : this.selectValues.third, problemGroups[2]],
      ]
    }

    const newScenario = getSortedArray(complexScenario || selectedData)

    let scenarioString = ''

    newScenario.map((item, index) => {
      scenarioString += `"${item[0]}":["${item[1]
        .toString()
        .split(',')
        .join('","')}"]`

      if (newScenario[index + 1]) scenarioString += ','
    })

    const params = `{"scenario":{${scenarioString}}}`

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  public setSingleScenario = (group: string, value: string): void => {
    const { problemGroups } = modalsControlStore

    if (group === problemGroups[0]) {
      this.setSingleSelectValue('first', value)

      this.sendRequest({ type: 'first', value })
    }

    if (group === problemGroups[1]) {
      this.setSingleSelectValue('second', value)

      this.sendRequest({ type: 'second', value })
    }

    if (group === problemGroups[2]) {
      this.setSingleSelectValue('third', value)

      this.sendRequest({ type: 'third', value })
    }

    this.setResetValue('')
  }

  public prepareAndSetComplexScenario(name: string): void {
    if (name === InheritanceModeEnum.HomozygousRecessive_XLinked) {
      this.setComplexScenario({ first: '2', second: '0-1', third: '0-1' })
    }

    if (name === InheritanceModeEnum.AutosomalDominant) {
      this.setComplexScenario({ first: '1-2', second: '0', third: '0' })
    }

    if (name === InheritanceModeEnum.Compensational) {
      this.setComplexScenario({ first: '0', second: '1-2', third: '1-2' })
    }

    if (name === 'empty') {
      this.setComplexScenario({ first: '--', second: '--', third: '--' })
    }

    this.setResetValue(name)
  }

  public setComplexScenario({ first, second, third }: ISelectValues): void {
    this.setComplexSelectValues({
      first,
      second,
      third,
    })

    const complexScenario: [string, string][] = [
      [first, modalsControlStore.problemGroups[0]],
      [second, modalsControlStore.problemGroups[1]],
      [third, modalsControlStore.problemGroups[2]],
    ]

    this.sendRequest({ complexScenario })
  }

  public closeModal(): void {
    modalsVisibilityStore.closeModalCustomInheritanceMode()
    this.resetData()
  }

  public openModalAttribute(): void {
    modalsVisibilityStore.closeModalCustomInheritanceMode()
    modalsVisibilityStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public addAttribute(action: ActionType): void {
    dtreeStore.addSelectedFilter(modalsControlStore.variants[0][0])
    const params = { scenario: dtreeStore.scenario }

    addAttributeToStep(
      action,
      FilterKindEnum.Func,
      ['True'],
      params,
      this.currentMode,
    )
    dtreeStore.resetSelectedFilters()
    modalsVisibilityStore.closeModalCustomInheritanceMode()
    this.resetData()
  }

  public saveChanges(): void {
    const params = { scenario: dtreeStore.scenario }

    changeFunctionalStep(params, this.currentMode)
    modalsVisibilityStore.closeModalCustomInheritanceMode()
    this.resetData()
  }

  public resetData(): void {
    this.selectValues = {
      first: '--',
      second: '--',
      third: '--',
    }

    this.resetValue = ''
    this.resetCurrentMode()
  }

  public getSelectedValue(currentGroup: any[], group: string): any {
    const data: any[] = Object.entries(
      currentGroup[currentGroup.length - 1].scenario,
    )

    let value = '--'

    data?.map((item, index) => {
      if (group && item[1].includes(group)) {
        value = data[index][0]
      }
    })

    return value
  }

  public checkExistedSelectedFilters(currentGroup: any[]): void {
    const { groupName, problemGroups } = modalsControlStore

    const scenarioString = getFuncParams(
      groupName,
      currentGroup[currentGroup.length - 1],
    )
      .slice(10)
      .replace(/\s+/g, '')

    this.setResetValue(
      getResetType(currentGroup[currentGroup.length - 1].scenario),
    )

    this.setComplexSelectValues({
      first: this.getSelectedValue(currentGroup, problemGroups[0]),
      second: this.getSelectedValue(currentGroup, problemGroups[1]),
      third: this.getSelectedValue(currentGroup, problemGroups[2]),
    })

    const params = `{"scenario":${scenarioString}}`

    const conditionJoinType = currentGroup[2]

    this.currentMode = getCurrentModeType(conditionJoinType)

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }
}

export default new ModalCustomInheritanceModeStore()
