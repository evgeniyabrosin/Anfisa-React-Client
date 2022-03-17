import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { getFilteredRequestCondition } from '@utils/function-panel/getFilteredRequestCondition'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import functionPanelStore from '../../function-panel.store'
import { getPureRequestString } from './../../../../../../../utils/function-panel/getPureRequestString'
import {
  ICompoundRequestCachedValues,
  TRequestCondition,
} from './../../function-panel.interface'

class CompoundRequestStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get cachedValues(): ICompoundRequestCachedValues {
    return functionPanelStore.getCachedValues<ICompoundRequestCachedValues>(
      FuncStepTypesEnum.CompoundRequest,
    )
  }

  public get requestCondition(): TRequestCondition[] {
    return (
      this.cachedValues?.conditions.request || [[1, {}] as TRequestCondition]
    )
  }

  public get resetValue(): string {
    return this.cachedValues?.reset || ''
  }

  public get selectedFilterValue(): string {
    const filteredRequestCondition = getFilteredRequestCondition(
      this.cachedValues?.conditions.request || this.requestCondition,
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

    this.setConditions({
      newRequestCondition,
    })
  }

  // prepared request creation
  public handleSetComplexRequest(
    resetName: string,
    activeRequestIndex: number,
  ): void {
    const resetRequestData = getResetRequestData(
      resetName,
      functionPanelStore.problemGroups,
    )

    const newRequest = Object.fromEntries(getSortedArray(resetRequestData))

    const newRequestCondition = cloneDeep(this.requestCondition)

    newRequestCondition.forEach((requestCondition, index) => {
      if (index === activeRequestIndex) {
        requestCondition[1] = newRequest
      }
    })

    this.setConditions({
      newRequestCondition,
      resetName,
    })
  }

  // add new request block
  public handleRequestBlocksAmount(
    type: string,
    setActiveRequestIndex: (length: number) => void,
    activeRequestIndex: number,
  ): void {
    if (type === 'ADD') {
      const emptyBlock: [number, any] = [1, {}]
      const newRequestCondition = [
        ...cloneDeep(this.requestCondition),
        emptyBlock,
      ]

      setActiveRequestIndex(newRequestCondition.length - 1)

      this.setConditions({
        newRequestCondition,
        resetName: 'empty',
      })
    } else {
      const newRequestCondition = cloneDeep(
        this.requestCondition.filter(
          (_item, index) => index !== activeRequestIndex,
        ),
      )

      setActiveRequestIndex(newRequestCondition.length - 1)

      this.setConditions({
        newRequestCondition,
        resetName: getResetType(
          newRequestCondition[newRequestCondition.length - 1][1],
        ),
      })
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

    this.setConditions({ newRequestCondition })
  }

  // choose an active request block
  public handleActiveRequest(
    requestBlockIndex: number,
    setActiveRequestIndex: (index: number) => void,
  ): void {
    setActiveRequestIndex(requestBlockIndex)

    const currentRequest = this.requestCondition[requestBlockIndex]

    this.setConditions({
      resetName: getResetType(currentRequest[1]) || 'empty',
    })
  }

  // cach values in every change
  public setConditions({ newRequestCondition, resetName }: any): void {
    functionPanelStore.setCachedValues<ICompoundRequestCachedValues>(
      FuncStepTypesEnum.CompoundRequest,
      {
        conditions: {
          approx: null,
          state: null,
          request: newRequestCondition || this.requestCondition,
        },
        reset: resetName || this.resetValue,
      },
    )
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
      ConditionJoinMode.OR,
      ['True'],
      {
        approx: this.cachedValues?.conditions.approx || null,
        state: this.cachedValues?.conditions.state || null,
        request: JSON.parse(`${getPureRequestString(requestString)}`),
      },
    ]

    const variant: TVariant = [
      `"request":${getPureRequestString(requestString)}}`,
      0,
    ]

    functionPanelStore.sumbitConditions(conditions, variant)
  }
}

export default new CompoundRequestStore()
