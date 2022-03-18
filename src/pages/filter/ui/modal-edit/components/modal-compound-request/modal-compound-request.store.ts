import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import modalEditStore, {
  IParams,
} from '@pages/filter/ui/modal-edit/modal-edit.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import dtreeModalStore from '../../../../modals.store'

class ModalCompoundRequestStore {
  requestCondition: ({}[] | [number, any])[] = [[1, {}]]
  stateCondition = '-current-'
  approxCondition = 'transcript'
  resetValue = ''
  stateOptions: string[] = [this.stateCondition]
  activeRequestIndex: number = this.requestCondition.length - 1

  constructor() {
    makeAutoObservable(this)
  }

  // root functions

  public setRequestCondition(requestCondition: ({}[] | [number, any])[]): void {
    this.requestCondition = requestCondition
  }

  public setStateCondition(stateCondition: string): void {
    this.stateCondition = stateCondition
  }

  public setApproxCondition(approxCondition: string): void {
    this.approxCondition = approxCondition
  }

  public setResetValue(resetValue: string): void {
    this.resetValue = resetValue
  }

  public setActiveRequestIndex(index: number): void {
    this.activeRequestIndex = index
  }

  public sendRequest(newRequestCondition: ({}[] | [number, any])[]): void {
    const requestString = getFuncParams(modalEditStore.groupName, {
      request: newRequestCondition,
    })
      .slice(10)
      .replace(/\s+/g, '')

    const approx =
      this.approxCondition === 'transcript' ? null : `"${this.approxCondition}"`

    const params = `{"approx":${approx},"state":${
      this.stateCondition === '-current-' || !this.stateCondition
        ? null
        : `"${this.stateCondition}"`
    },"request":${requestString}}`

    dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
  }

  // request control functions

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
    value: string,
  ): void {
    if (+value < 0) return

    const newRequestCondition: any[] = cloneDeep(this.requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[0] = +value
      }
    })

    this.setRequestCondition(newRequestCondition)

    this.sendRequest(newRequestCondition)
  }

  // approx, state control function

  public setCondition(value: string, type: string): void {
    if (type === 'approx') {
      this.setApproxCondition(value)

      const request = getFuncParams(modalEditStore.groupName, {
        approx: value,
        request: this.requestCondition,
      })
        .slice(10)
        .replace(/\s+/g, '')

      const approx = value === 'transcript' ? null : `"${value}"`

      const params = `{"approx":${approx},"state":${
        this.stateCondition !== '-current-' ? `"${this.stateCondition}"` : null
      },"request":${request}}`

      dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
    }

    if (type === 'state') {
      this.setStateCondition(value)

      const approx =
        this.approxCondition === 'transcript'
          ? null
          : `"${this.approxCondition}"`

      const params = `{"approx":${approx},"state":${
        value !== '-current-' ? `"${value}"` : null
      }}`

      dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
    }
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
      modalEditStore.problemGroups,
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
      modalEditStore.problemGroups,
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
    const approx =
      this.approxCondition === 'transcript' ? null : `"${this.approxCondition}"`

    const params: IParams = {
      approx,
    }

    if (this.stateCondition) {
      params.state =
        JSON.stringify(this.stateOptions) === JSON.stringify(['-current-'])
          ? null
          : this.stateOptions
    }

    params.request = this.requestCondition

    addAttributeToStep(action, 'func', null, params)

    dtreeStore.resetSelectedFilters()

    dtreeModalStore.closeModalCompoundRequest()

    this.resetData()
  }

  public saveChanges(): void {
    const approx =
      this.approxCondition === 'transcript' ? null : `"${this.approxCondition}"`

    const params: IParams = {
      approx,
    }

    if (this.stateCondition) {
      params.state =
        JSON.stringify(this.stateOptions) === JSON.stringify(['-current-'])
          ? null
          : this.stateOptions
    }

    params.request = this.requestCondition

    changeFunctionalStep(params)

    dtreeModalStore.closeModalCompoundRequest()

    this.resetData()
  }

  // other control functions

  public resetData() {
    this.stateCondition = '-current-'
    this.approxCondition = 'transcript'
    this.resetValue = ''
    this.requestCondition = [[1, {}]]
  }

  public closeModal(): void {
    dtreeModalStore.closeModalCompoundRequest()

    this.resetData()
  }

  public openModalAttribute = () => {
    dtreeModalStore.closeModalCompoundRequest()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public checkExistedSelectedFilters(currentGroup: any[]) {
    const approx =
      this.approxCondition === 'transcript' ? null : `"${this.approxCondition}"`

    const { groupName } = modalEditStore

    const requestString = getFuncParams(
      groupName,
      currentGroup[currentGroup.length - 1],
    )
      .slice(10)
      .replace(/\s+/g, '')

    this.setResetValue(
      getResetType(
        currentGroup[currentGroup.length - 1].request[
          currentGroup[currentGroup.length - 1].request.length - 1
        ][1],
      ),
    )

    this.setRequestCondition(currentGroup[currentGroup.length - 1].request)

    const params = `{"approx":${approx},"state":${
      this.stateCondition === '-current-' || !this.stateCondition
        ? null
        : `"${this.stateCondition}"`
    },"request":${requestString}}`

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }
}

export default new ModalCompoundRequestStore()
