import { makeAutoObservable, toJS } from 'mobx'

import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import {
  AttributeKinds,
  IFuncPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'
import dtreeModalStore from '../../modals.store'

export const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export interface IParams {
  approx: any
  state?: string[] | null
  default?: string
  request?: any[]
}

class ModalEditStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = dtreeModalStore.groupIndexToChange
    const { stepIndexForApi } = activeStepStore

    return [+stepIndexForApi, locationIndex]
  }

  public get variants(): string[] | [string, number] {
    return dtreeStore.statFuncData.variants
  }

  public get groupName(): string {
    return dtreeModalStore.groupNameToChange
  }

  get currentGroupToChange() {
    if (dtreeModalStore.groupIndexToChange < 0) {
      return undefined
    }

    return toJS(
      dtreeStore.stepData[activeStepStore.activeStepIndex].groups[
        dtreeModalStore.groupIndexToChange
      ],
    )
  }

  public get currentGroupLength(): number {
    return this.currentGroupToChange?.length ?? 0
  }

  public get currentStepGroups(): string[] {
    return toJS(dtreeStore.stepData[activeStepStore.activeStepIndex].groups)
  }

  public get statList(): TPropertyStatus[] {
    return dtreeStore.stat.list || []
  }

  get attributeStatusToChange(): TPropertyStatus | undefined {
    return this.groupName
      ? toJS(dtreeStore.stat.getAttributeStatusByName(this.groupName))
      : undefined
  }

  get funcAttributeStatusToChange(): IFuncPropertyStatus | undefined {
    const status = this.attributeStatusToChange

    return status && status?.kind === AttributeKinds.FUNC ? status : undefined
  }

  public get problemGroups(): string[] {
    return this.funcAttributeStatusToChange?.family ?? []
  }

  public get approxModes(): string[][] {
    return this.funcAttributeStatusToChange?.['approx-modes'] ?? []
  }

  public get approxOptions(): string[] {
    const approxOptions: string[] = []

    this.approxModes.map((mode: string[]) => {
      approxOptions.push(mode[1])
    })

    return approxOptions
  }

  public get approxValues(): string[] {
    const approxValues: string[] = []

    this.approxModes.map((mode: string[]) => {
      approxValues.push(mode[0])
    })

    return approxValues
  }

  public openModalJoin(): void {
    dtreeModalStore.openModalJoin()
  }
}

export default new ModalEditStore()
