import { Dispatch, SetStateAction } from 'react'
import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import dtreeModalStore from '../../../../modals.store'
import { getCurrentModeType } from './../../../../../../utils/getCurrentModeType'

interface ISetProblemGroupsProps {
  checked: boolean
  value: string
  groupName: string
  setSelectedProblemGroups: Dispatch<SetStateAction<string[]>>
}
class ModalInheritanceModeStore {
  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentMode(modeType: ModeTypes) {
    this.currentMode = modeType
  }

  public resetCurrentMode() {
    this.currentMode = undefined
  }

  public get variants(): [string, number][] {
    const variants: [string, number][] = dtreeStore.statFuncData.variants

    return variants
      ? variants.filter(([, variantValue]) => variantValue > 0)
      : []
  }

  public setProblemGroups = ({
    checked,
    value,
    groupName,
    setSelectedProblemGroups,
  }: ISetProblemGroupsProps) => {
    if (checked) {
      setSelectedProblemGroups((prev: any) => {
        const newProblemGroupData = [...prev, value]

        const params = `{"problem_group":["${newProblemGroupData
          .reverse()
          .toString()
          .split(',')
          .join('","')}"]}`

        dtreeStore.fetchStatFuncAsync(groupName, params)

        return newProblemGroupData
      })
    } else {
      setSelectedProblemGroups((prev: any) => {
        const newProblemGroupData = prev.filter(
          (item: string) => item !== value,
        )

        const params = `{"problem_group": ["${newProblemGroupData
          .toString()
          .split(',')
          .join('", "')}"]}`

        dtreeStore.fetchStatFuncAsync(groupName, params)

        return newProblemGroupData
      })
    }
  }

  public resetProblemGroups = (
    groupName: string,
    setSelectedProblemGroups: Dispatch<SetStateAction<string[]>>,
  ): void => {
    setSelectedProblemGroups([])
    this.resetCurrentMode()

    const params = `{"problem_group": ["${[]
      .toString()
      .split(',')
      .join('", "')}"]}`

    dtreeStore.fetchStatFuncAsync(groupName, params)
    this.clearAllGroupVariants()
  }

  public saveChanges = (selectedProblemGroups: string[]): void => {
    const params = { problem_group: selectedProblemGroups }

    changeFunctionalStep(params, this.currentMode, true)
    dtreeModalStore.closeModalInheritanceMode()
    dtreeStore.resetSelectedFilters()
    this.resetCurrentMode()
  }

  public handleCheckGroupVariantItem(checked: boolean, name: string): void {
    if (checked) {
      dtreeStore.addSelectedFilter(name)
      return
    }

    dtreeStore.removeSelectedFilter(name)
  }

  public clearAllGroupVariants(): void {
    this.variants.forEach((variant: any[]) =>
      dtreeStore.removeSelectedFilter(variant[0]),
    )
  }

  public setAllGroupVariants(): void {
    this.variants.forEach((variant: any[]) =>
      dtreeStore.addSelectedFilter(variant[0]),
    )
  }

  public addAttribute = (
    action: ActionType,
    selectedProblemGroups: string[],
  ): void => {
    const params = { problem_group: selectedProblemGroups }

    addAttributeToStep(action, 'func', null, params, this.currentMode)

    dtreeStore.resetSelectedFilters()
    dtreeModalStore.closeModalInheritanceMode()
    this.resetCurrentMode()
  }

  public openModalAttribute = (): void => {
    dtreeModalStore.closeModalInheritanceMode()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public closeModal(): void {
    dtreeModalStore.closeModalInheritanceMode()
    this.resetCurrentMode()
  }

  public fetchStatFunc(groupName: string, params: string): void {
    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  public checkExistedSelectedFilters(currentGroup: any[]) {
    currentGroup
      .find((elem: any) => Array.isArray(elem))
      .map((item: string) => dtreeStore.addSelectedFilter(item))

    const conditionJoinType = currentGroup[2]

    this.currentMode = getCurrentModeType(conditionJoinType)
  }
}

export default new ModalInheritanceModeStore()
