import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TRequestCondition } from '@service-providers/common'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getFilteredRequestCondition } from '@utils/function-panel/getFilteredRequestCondition'
import { getPureRequestString } from '@utils/function-panel/getPureRequestString'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import functionPanelStore from '../../function-panel.store'

class CompoundRequestStore {
  private _requestCondition: TRequestCondition[] = [
    [1, {}] as TRequestCondition,
  ]
  private _resetValue: string = ''
  private _activeRequestIndex = this.requestCondition.length - 1
  private _currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public get requestCondition(): TRequestCondition[] {
    return this._requestCondition
  }

  public get resetValue(): string {
    return this._resetValue
  }

  public get activeRequestIndex(): number {
    return this._activeRequestIndex
  }

  public get currentMode(): ModeTypes | undefined {
    return this._currentMode
  }

  public setActiveRequestIndex(idx: number) {
    this._activeRequestIndex = idx
  }

  public resetActiveRequestIndex() {
    this._activeRequestIndex = this.requestCondition.length - 1
  }

  public setCurrentMode(modeType?: ModeTypes): void {
    if (!modeType) {
      this._currentMode = undefined
    }

    if (this.currentMode === modeType) {
      this.resetCurrentMode()

      return
    }

    this._currentMode = modeType
  }

  public resetCurrentMode(): void {
    this._currentMode = undefined
  }

  public setRequestCondition(requestCondition: TRequestCondition[]) {
    this._requestCondition = requestCondition
  }

  public setResetValue(resetValue: string) {
    this._resetValue = resetValue
  }

  public clearRequestCondition() {
    this._requestCondition = [[1, {}] as TRequestCondition]
  }

  public clearResetValue() {
    this._resetValue = ''
  }

  public get selectedFilterValue(): string {
    const filteredRequestCondition = getFilteredRequestCondition(
      this.requestCondition,
    )

    const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
      request: filteredRequestCondition,
    }).replace(/\s+/g, '')

    return `"request":${getPureRequestString(requestString)}}`
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
    value: string,
  ): void {
    if (+value < 0) return

    const newRequestCondition = cloneDeep(this.requestCondition)

    newRequestCondition.map((item, index) => {
      if (index === requestBlockIndex) {
        item[0] = +value
      }
    })

    this.setRequestCondition(newRequestCondition)
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
      'func',
      FuncStepTypesEnum.CompoundRequest,
      getConditionJoinMode(this.currentMode),
      ['True'],
      {
        approx: null,
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
  }
}

export default new CompoundRequestStore()
