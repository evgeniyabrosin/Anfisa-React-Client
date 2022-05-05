import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import {
  ICompoundHetArgs,
  TFuncCondition,
} from '@service-providers/common/common.interface'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getApproxName } from '@utils/getApproxName'
import { getApproxValue } from '@utils/getApproxValue'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import modalsControlStore, { IParams } from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'

class ModalCompoundHetStore {
  public approx: ApproxNameTypes = ApproxNameTypes.Non_Intersecting_Transcript

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

  public setApprox(approx: ApproxNameTypes) {
    this.approx = approx
    this.fetchStatFunc()
  }

  public openModalAttribute(): void {
    modalsVisibilityStore.closeModalCompoundHet()
    modalsVisibilityStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public addAttribute(action: ActionType): void {
    dtreeStore.addSelectedFilter(modalsControlStore.variants[0][0])

    const params: IParams = {
      approx: datasetStore.isXL ? null : getApproxValue(this.approx),
    }

    addAttributeToStep(action, 'func', null, params, this.currentMode)

    dtreeStore.resetSelectedFilters()
    modalsVisibilityStore.closeModalCompoundHet()
    this.resetData()
  }

  public closeModal(): void {
    modalsVisibilityStore.closeModalCompoundHet()
    this.resetData()
  }

  public getApprox(approxValue: string): null | string {
    return approxValue === 'transcript' ? null : `${approxValue}`
  }

  public saveChanges = () => {
    const params: IParams = {
      approx: datasetStore.isXL ? null : getApproxValue(this.approx),
    }

    changeFunctionalStep(params, this.currentMode)
    modalsVisibilityStore.closeModalCompoundHet()
    this.resetData()
  }

  public fetchStatFunc(currentGroup?: TFuncCondition): void {
    const params = JSON.stringify({
      approx: datasetStore.isXL ? null : getApproxValue(this.approx),
      state: null,
    })

    if (currentGroup) {
      const conditionJoinType = currentGroup[2]

      this.currentMode = getCurrentModeType(conditionJoinType)

      if (!datasetStore.isXL) {
        const currentGroupApprox = currentGroup[4] as ICompoundHetArgs
        const approxName = getApproxName(
          currentGroupApprox['approx'] || undefined,
        )
        this.setApprox(approxName)
      }
    }

    dtreeStore.fetchStatFuncAsync(modalsControlStore.groupName, params)
  }

  public resetData() {
    this.resetCurrentMode()
  }
}

export default new ModalCompoundHetStore()
