import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import modalsControlStore, {
  IParams,
} from '@pages/filter/dtree/components/modals/modals-control-store'
import {
  ICompoundRequestArgs,
  TRequestCondition,
} from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getApproxName } from '@utils/getApproxName'
import { getApproxValue } from '@utils/getApproxValue'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import modalsVisibilityStore from '../../modals-visibility-store'

class ModalCompoundRequestStore {
  public requestCondition: TRequestCondition[] = [[1, {}] as TRequestCondition]
  public resetValue = ''
  public activeRequestIndex: number = this.requestCondition.length - 1
  public currentMode?: ModeTypes
  public approx: ApproxNameTypes = ApproxNameTypes.Non_Intersecting_Transcript

  constructor() {
    makeAutoObservable(this)
  }

  // root functions

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
    this.sendRequest()
  }

  public setResetValue(resetValue: string): void {
    this.resetValue = resetValue
  }

  public setActiveRequestIndex(index: number): void {
    this.activeRequestIndex = index
  }

  public setRequestCondition(requestCondition: TRequestCondition[]): void {
    this.requestCondition = requestCondition
  }

  // request control functions

  public sendRequest(newRequestCondition?: ({}[] | [number, any])[]): void {
    const requestString = getFuncParams(modalsControlStore.groupName, {
      request: newRequestCondition || this.requestCondition,
    })
      .slice(10)
      .replace(/\s+/g, '')

    const approx =
      this.approx === ApproxNameTypes.Shared_Transcript
        ? null
        : `"${getApproxValue(this.approx)}"`

    const params = `{"approx":${approx},"state":${null},"request":${requestString}}`

    dtreeStore.fetchStatFuncAsync(modalsControlStore.groupName, params)
  }

  public setActiveRequest(requestBlockIndex: number, event: any): void {
    const classList = Array.from(event.target.classList)

    const shouldMakeActive = classList.includes('step-content-area')

    if (shouldMakeActive) {
      this.setActiveRequestIndex(requestBlockIndex)
    }

    const currentRequest = this.requestCondition[requestBlockIndex]

    this.setResetValue(getResetType(currentRequest[1]))
  }

  public setRequestBlocksAmount(type: string): void {
    if (type === 'ADD') {
      const emptyBlock: [number, any] = [1, {}]
      const newRequestCondition = [
        ...cloneDeep(this.requestCondition),
        emptyBlock,
      ]

      this.setRequestCondition(newRequestCondition)
      this.setActiveRequestIndex(newRequestCondition.length - 1)
      this.setResetValue('')
    } else {
      const newRequestCondition = cloneDeep(this.requestCondition).filter(
        (_item: any[], index: number) => index !== this.activeRequestIndex,
      )

      this.setRequestCondition(newRequestCondition)
      this.setActiveRequestIndex(newRequestCondition.length - 1)

      this.sendRequest(newRequestCondition)

      this.setResetValue(
        getResetType(newRequestCondition[newRequestCondition.length - 1][1]),
      )
    }
  }

  public changeRequestConditionNumber(
    requestBlockIndex: number,
    value: number,
  ): void {
    if (value < 0) return

    this.requestCondition[requestBlockIndex][0] = value

    this.sendRequest(this.requestCondition)
  }

  // helper fucntion

  public getSelectedValue(group: string, index: number): string {
    let value = '--'

    const currentRequestBlock = this.requestCondition[index][1]

    Object.entries(currentRequestBlock).map((item: any[]) => {
      if (item[1].includes(group)) {
        value = item[0]
      }
    })

    return value
  }

  // set scenarion functions

  public setSingleScenario(
    requestBlockIndex: number,
    currentSelectIndex: number,
    target: any,
  ): void {
    const requestData = getRequestData(
      target,
      currentSelectIndex,
      modalsControlStore.problemGroups,
    )

    const newRequest = Object.fromEntries(getSortedArray(requestData))

    const newRequestCondition: any[] = cloneDeep(this.requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[1] = newRequest
      }
    })

    this.setRequestCondition(newRequestCondition)

    this.sendRequest(newRequestCondition)

    this.setResetValue('')
  }

  public setComplexScenario(name: string): void {
    const resetRequestData = getResetRequestData(
      name,
      modalsControlStore.problemGroups,
    )

    const newRequest = Object.fromEntries(getSortedArray(resetRequestData))

    const newRequestCondition: any[] = cloneDeep(this.requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === this.activeRequestIndex) {
        item[1] = newRequest
      }
    })

    this.setRequestCondition(newRequestCondition)

    this.sendRequest(newRequestCondition)

    this.setResetValue(name)
  }

  // final functions to add/save filter

  public addAttribute(action: ActionType): void {
    const params: IParams = {
      approx: datasetStore.isXL ? null : getApproxValue(this.approx),
    }

    params.request = this.requestCondition

    addAttributeToStep(action, 'func', null, params, this.currentMode)

    dtreeStore.resetSelectedFilters()

    modalsVisibilityStore.closeModalCompoundRequest()

    this.resetData()
  }

  public saveChanges(): void {
    const params: IParams = {
      approx: datasetStore.isXL ? null : getApproxValue(this.approx),
    }

    params.request = this.requestCondition

    changeFunctionalStep(params, this.currentMode)

    modalsVisibilityStore.closeModalCompoundRequest()

    this.resetData()
  }

  // other control functions

  public resetData() {
    this.resetValue = ''
    this.requestCondition = [[1, {}]]
    this.resetCurrentMode()
  }

  public closeModal(): void {
    modalsVisibilityStore.closeModalCompoundRequest()

    this.resetData()
  }

  public openModalAttribute = () => {
    modalsVisibilityStore.closeModalCompoundRequest()
    modalsVisibilityStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public checkExistedSelectedFilters(currentGroup: any[]) {
    const request = currentGroup[currentGroup.length - 1].request

    this.setResetValue(getResetType(request[request.length - 1][1]))

    this.setRequestCondition(request)

    const conditionJoinType = currentGroup[2]

    this.setCurrentMode(getCurrentModeType(conditionJoinType))

    if (!datasetStore.isXL) {
      const selectedFilterApprox = currentGroup[4] as ICompoundRequestArgs

      const approxName = getApproxName(
        selectedFilterApprox['approx'] || undefined,
      )

      this.setApprox(approxName)
    }

    const requestString = getFuncParams(
      FuncStepTypesEnum.CompoundRequest,
      currentGroup[currentGroup.length - 1],
    )
      .slice(10)
      .replace(/\s+/g, '')

    dtreeStore.fetchStatFuncAsync(
      FuncStepTypesEnum.CompoundRequest,
      this.getParams(requestString),
    )
  }

  public getParams(requestString: string) {
    return JSON.stringify({
      approx: datasetStore.isXL ? null : getApproxValue(this.approx),
      state: null,
      request: JSON.parse(requestString),
    })
  }
}

export default new ModalCompoundRequestStore()
