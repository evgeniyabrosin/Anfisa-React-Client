import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import dtreeModalStore from '../../../../modals.store'
import modalEditStore, { IParams } from '../../modal-edit.store'

class ModalCompoundHetStore {
  stateCondition = '-current-'
  approxCondition = 'transcript'
  stateOptions: string[] = [this.stateCondition]

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

  public setStateCondition(condtition: string): void {
    this.stateCondition = condtition
  }

  public setApproxCondition(condtition: string): void {
    this.approxCondition = condtition
  }

  public resetConditions(): void {
    this.stateCondition = '-current-'
    this.approxCondition = 'transcript'
  }

  public openModalAttribute(): void {
    dtreeModalStore.closeModalCompoundHet()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public addAttribute(action: ActionType): void {
    dtreeStore.addSelectedFilter(modalEditStore.variants[0][0])

    const params: IParams = {
      approx:
        this.approxCondition === 'transcript' ? null : this.approxCondition,
    }

    if (this.stateCondition) {
      params.state =
        JSON.stringify(this.stateOptions) === JSON.stringify(['-current-'])
          ? null
          : this.stateOptions
    }

    addAttributeToStep(action, 'func', null, params, this.currentMode)

    dtreeStore.resetSelectedFilters()
    dtreeModalStore.closeModalCompoundHet()
    this.resetCurrentMode()
  }

  public closeModal(): void {
    dtreeModalStore.closeModalCompoundHet()
    this.resetCurrentMode()
  }

  public getApprox(approxValue: string): null | string {
    return approxValue === 'transcript' ? null : `${approxValue}`
  }

  public setCondition = (value: string, type: string) => {
    if (type === 'approx') {
      this.setApproxCondition(value)

      const params = `{"approx":${this.getApprox(value)},"state":${
        this.stateCondition !== '-current-' ? `"${this.stateCondition}"` : null
      }}`

      dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
    }

    if (type === 'state') {
      this.setStateCondition(value)

      const params = `{"approx":${this.getApprox(
        this.approxCondition,
      )},"state":${value !== '-current-' ? `"${value}"` : null}}`

      dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
    }
  }

  public saveChanges = () => {
    const params: IParams = { approx: this.approxCondition }

    if (this.stateCondition) {
      params.state =
        JSON.stringify(this.stateOptions) === JSON.stringify(['-current-'])
          ? null
          : this.stateOptions
    }

    changeFunctionalStep(params, this.currentMode)
    dtreeModalStore.closeModalCompoundHet()
    this.resetCurrentMode()
  }

  public fetchStatFunc(currentGroup: TFuncCondition): void {
    const params = `{"approx":${this.getApprox(this.approxCondition)},"state":${
      this.stateCondition === '-current-' || !this.stateCondition
        ? null
        : `"${this.stateCondition}"`
    }}`

    if (currentGroup) {
      const conditionJoinType = currentGroup[2]

      this.currentMode = getCurrentModeType(conditionJoinType)
    }

    dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
  }
}

export default new ModalCompoundHetStore()
