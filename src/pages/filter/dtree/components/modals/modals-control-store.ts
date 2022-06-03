import { makeAutoObservable, toJS } from 'mobx'

import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import {
  AttributeKinds,
  IFuncPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'
import modalsVisibilityStore from './modals-visibility-store'

export const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export interface IParams {
  approx: any
  state?: string[] | null
  default?: string
  request?: any[]
}

class ModalsControlStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = modalsVisibilityStore.groupIndexToChange
    const { stepIndexForApi } = activeStepStore

    return [+stepIndexForApi, locationIndex]
  }

  public get variants(): string[] | [string, number] {
    return dtreeStore.statFuncData.variants
  }

  public get groupName(): string {
    return modalsVisibilityStore.groupNameToChange
  }

  get currentGroupToChange() {
    if (modalsVisibilityStore.groupIndexToChange < 0) {
      return undefined
    }

    const group = toJS(
      dtreeStore.stepData[activeStepStore.activeStepIndex].groups[
        modalsVisibilityStore.groupIndexToChange
      ],
    )

    /**
     * TODO: see getStepDataAsync.ts:57
     *       The join type added on the 3rd index of group
     *       for second and next groups in step.
     *       It's terrible! And should be fixed
     */
    if (group[3] === 'or' || group[3] === 'and') {
      group.splice(3, 1)
    }

    return group
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
    modalsVisibilityStore.openModalJoin()
  }
}

export default new ModalsControlStore()
