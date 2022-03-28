import { Dispatch, SetStateAction } from 'react'
import { makeAutoObservable, toJS } from 'mobx'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import dtreeModalStore from '../../../../modals.store'
interface ISetProblemGroupsProps {
  checked: boolean
  value: string
  groupName: string
  setSelectedProblemGroups: Dispatch<SetStateAction<string[]>>
}
class ModalInheritanceModeStore {
  constructor() {
    makeAutoObservable(this)
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

    const params = `{"problem_group": ["${[]
      .toString()
      .split(',')
      .join('", "')}"]}`

    dtreeStore.fetchStatFuncAsync(groupName, params)
    this.clearAllGroupVariants()
  }

  public saveChanges = (selectedProblemGroups: string[]): void => {
    const params = { problem_group: selectedProblemGroups }

    changeFunctionalStep(params, true)
    dtreeModalStore.closeModalInheritanceMode()
    dtreeStore.resetSelectedFilters()
  }

  public handleCheckGroupVariantItem(checked: boolean, name: string): void {
    if (checked) {
      dtreeStore.addSelectedFilter(name)
      return
    }

    dtreeStore.removeSelectedFilter(name)
  }

  public clearAllGroupVariants(): void {
    const variants = toJS(dtreeStore.statFuncData.variants)
    variants &&
      variants.forEach((variant: any[]) =>
        dtreeStore.removeSelectedFilter(variant[0]),
      )
  }

  public setAllGroupVariants(): void {
    const variants = toJS(dtreeStore.statFuncData.variants)
    variants &&
      variants.forEach((variant: any[]) =>
        dtreeStore.addSelectedFilter(variant[0]),
      )
  }

  public addAttribute = (
    action: ActionType,
    selectedProblemGroups: string[],
  ): void => {
    const params = { problem_group: selectedProblemGroups }

    addAttributeToStep(action, 'func', null, params)

    dtreeStore.resetSelectedFilters()
    dtreeModalStore.closeModalInheritanceMode()
  }

  public openModalAttribute = (): void => {
    dtreeModalStore.closeModalInheritanceMode()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public closeModal(): void {
    dtreeModalStore.closeModalInheritanceMode()
  }

  public fetchStatFunc(groupName: string, params: string): void {
    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  public checkExistedSelectedFilters(currentGroup: any[]) {
    currentGroup
      .find((elem: any) => Array.isArray(elem))
      .map((item: string) => dtreeStore.addSelectedFilter(item))
  }
}

export default new ModalInheritanceModeStore()
