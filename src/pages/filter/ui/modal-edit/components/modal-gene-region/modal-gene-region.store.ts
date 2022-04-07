import get from 'lodash/get'
import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import dtreeModalStore from '../../../../modals.store'

class ModalGeneRegionStore {
  locusCondition = ''
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

  public setLocusCondition(locusCondition: string): void {
    this.locusCondition = locusCondition
  }

  public closeModal(): void {
    dtreeModalStore.closeModalGeneRegion()
    this.resetData()
  }

  public openModalAttribute(): void {
    dtreeModalStore.closeModalGeneRegion()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public fetchStatFunc(currentGroup: any[]): void {
    const { groupName } = modalEditStore

    const defaultValue = get(currentGroup[currentGroup.length - 1], 'locus')

    const params = `{"locus":"${defaultValue || ''}"}`

    this.setLocusCondition(defaultValue)

    const conditionJoinType = currentGroup[2]

    this.currentMode = getCurrentModeType(conditionJoinType)

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  public addAttribute(action: ActionType): void {
    dtreeStore.addSelectedFilter(modalEditStore.variants[0][0])

    const params = { locus: this.locusCondition }

    addAttributeToStep(action, 'func', null, params, this.currentMode)

    dtreeStore.resetSelectedFilters()

    dtreeModalStore.closeModalGeneRegion()
    this.resetData()
  }

  public saveChanges(): void {
    const params = { locus: this.locusCondition }

    changeFunctionalStep(params, this.currentMode)

    dtreeModalStore.closeModalGeneRegion()
    this.resetData()
  }

  public resetData(): void {
    this.locusCondition = ''
    this.resetCurrentMode()
  }
}

export default new ModalGeneRegionStore()
