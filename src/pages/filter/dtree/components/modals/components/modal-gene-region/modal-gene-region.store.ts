import get from 'lodash/get'
import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import modalsVisibilityStore from '../../modals-visibility-store'

class ModalGeneRegionStore {
  locusCondition = ''
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

  public setLocusCondition(locusCondition: string): void {
    this.locusCondition = locusCondition
  }

  public closeModal(): void {
    modalsVisibilityStore.closeModalGeneRegion()
    this.resetData()
  }

  public openModalAttribute(): void {
    modalsVisibilityStore.closeModalGeneRegion()
    modalsVisibilityStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public fetchStatFunc(currentGroup: any[]): void {
    const { groupName } = modalsControlStore

    const defaultValue = get(currentGroup[currentGroup.length - 1], 'locus')

    const params = `{"locus":"${defaultValue || ''}"}`

    this.setLocusCondition(defaultValue)

    const conditionJoinType = currentGroup[2]

    this.currentMode = getCurrentModeType(conditionJoinType)

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  public addAttribute(action: ActionType): void {
    dtreeStore.addSelectedFilter(modalsControlStore.variants[0][0])

    const params = { locus: this.locusCondition }

    addAttributeToStep(action, 'func', null, params, this.currentMode)

    dtreeStore.resetSelectedFilters()

    modalsVisibilityStore.closeModalGeneRegion()
    this.resetData()
  }

  public saveChanges(): void {
    const params = { locus: this.locusCondition }

    changeFunctionalStep(params, this.currentMode)

    modalsVisibilityStore.closeModalGeneRegion()
    this.resetData()
  }

  public resetData(): void {
    this.locusCondition = ''
    this.resetCurrentMode()
  }
}

export default new ModalGeneRegionStore()
