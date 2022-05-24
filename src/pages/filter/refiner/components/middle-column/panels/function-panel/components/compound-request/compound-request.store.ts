import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable } from 'mobx'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import { TRequestCondition } from '@service-providers/common'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getFilteredRequestCondition } from '@utils/function-panel/getFilteredRequestCondition'
import { getPureRequestString } from '@utils/function-panel/getPureRequestString'
import { getApproxValue } from '@utils/getApproxValue'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import functionPanelStore from '../../function-panel.store'

class CompoundRequestStore {
  public requestCondition: TRequestCondition[] = [[1, {}] as TRequestCondition]
  public resetValue: string = ''
  public activeRequestIndex = this.requestCondition.length - 1
  public currentMode?: ModeTypes
  public approx = datasetStore.isXL
    ? ApproxNameTypes.Non_Intersecting_Transcript
    : ApproxNameTypes.Shared_Gene

  constructor() {
    makeAutoObservable(this)
  }

  public setActiveRequestIndex(idx: number) {
    this.activeRequestIndex = idx
  }

  public resetActiveRequestIndex() {
    this.activeRequestIndex = this.requestCondition.length - 1
  }

  public setApprox = (approx: ApproxNameTypes) => {
    this.approx = approx
  }

  public setCurrentMode(modeType?: ModeTypes): void {
    if (!modeType || this.currentMode === modeType) {
      this.currentMode = undefined

      return
    }

    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public setRequestCondition(requestCondition: TRequestCondition[]) {
    this.requestCondition = requestCondition
  }

  public setResetValue(resetValue: string) {
    this.resetValue = resetValue
  }

  public clearRequestCondition() {
    this.requestCondition = [[1, {}] as TRequestCondition]
  }

  public clearResetValue() {
    this.resetValue = ''
  }

  public clearApprox() {
    this.approx = datasetStore.isXL
      ? ApproxNameTypes.Non_Intersecting_Transcript
      : ApproxNameTypes.Shared_Gene
  }

  public get selectedFilterValue(): string {
    const filteredRequestCondition = getFilteredRequestCondition(
      this.requestCondition,
    )

    const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
      request: filteredRequestCondition,
    }).replace(/\s+/g, '')

    return getPureRequestString(requestString)
  }

  // request creation step by step
  public handleSetSingleRequest(
    requestBlockIndex: number,
    currentSelectIndex: number,
    target: HTMLSelectElement,
  ): void {
    const requestData = getRequestData(
      target,
      currentSelectIndex,
      functionPanelStore.problemGroups,
    )

    const newRequest = Object.fromEntries(getSortedArray(requestData))

    const newRequestCondition = cloneDeep(this.requestCondition)

    newRequestCondition.forEach((item, index) => {
      if (index === requestBlockIndex) {
        item[1] = newRequest
      }
    })

    this.setRequestCondition(newRequestCondition)
  }

  // prepared request creation
  public handleSetComplexRequest(resetName: string): void {
    const resetRequestData = getResetRequestData(
      resetName,
      functionPanelStore.problemGroups,
    )

    const newRequest = Object.fromEntries(getSortedArray(resetRequestData))

    const newRequestCondition = cloneDeep(this.requestCondition)

    newRequestCondition.forEach((requestCondition, index) => {
      if (index === this.activeRequestIndex) {
        requestCondition[1] = newRequest
      }
    })

    this.setRequestCondition(newRequestCondition)
    this.setResetValue(resetName)
  }

  // add new request block
  public handleRequestBlocksAmount(
    type: string,
    activeRequestIndex: number,
  ): void {
    if (type === 'ADD') {
      const emptyBlock: [number, any] = [1, {}]
      const newRequestCondition = [
        ...cloneDeep(this.requestCondition),
        emptyBlock,
      ]

      this.setActiveRequestIndex(newRequestCondition.length - 1)

      this.setRequestCondition(newRequestCondition)
      this.setResetValue('empty')
    } else {
      const newRequestCondition = cloneDeep(
        this.requestCondition.filter(
          (_item, index) => index !== activeRequestIndex,
        ),
      )

      this.setActiveRequestIndex(newRequestCondition.length - 1)

      this.setRequestCondition(newRequestCondition)
      this.setResetValue(
        getResetType(newRequestCondition[newRequestCondition.length - 1][1]),
      )
    }
  }

  // change reuqest condition number
  public handleRequestConditionNumber(
    requestBlockIndex: number,
    value: number,
  ): void {
    if (value < 0) return

    this.requestCondition[requestBlockIndex][0] = value
  }

  // choose an active request block
  public handleActiveRequest(requestBlockIndex: number): void {
    this.setActiveRequestIndex(requestBlockIndex)

    const currentRequest = this.requestCondition[requestBlockIndex]

    this.setResetValue(getResetType(currentRequest[1]) || 'empty')
  }

  public handleSumbitCondtions(): void {
    const filteredRequestCondition = getFilteredRequestCondition(
      this.requestCondition,
    )

    const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
      request: filteredRequestCondition,
    }).replace(/\s+/g, '')

    const conditions: TFuncCondition = [
      FilterKindEnum.Func,
      FuncStepTypesEnum.CompoundRequest,
      getConditionJoinMode(this.currentMode),
      ['True'],
      {
        approx: datasetStore.isXL ? null : getApproxValue(this.approx),
        state: null,
        request: JSON.parse(`${getPureRequestString(requestString)}`),
      },
    ]

    functionPanelStore.submitConditions(conditions)

    this.clearData()
    filterStore.resetStatFuncData()
  }

  public clearData(): void {
    this.setActiveRequestIndex(0)
    this.resetCurrentMode()
    this.clearResetValue()
    this.clearRequestCondition()
    this.clearApprox()
  }
}

export default new CompoundRequestStore()
