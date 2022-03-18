import { makeAutoObservable } from 'mobx'

import { StatList } from '@declarations'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
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

    const location: [number, number] = [+stepIndexForApi, locationIndex]
    return location
  }

  public get variants(): string[] | [string, number] {
    return dtreeStore.statFuncData.variants
  }

  public get groupName(): string {
    return dtreeModalStore.groupNameToChange
  }

  public get currentGroupLength(): number {
    return dtreeStore.stepData[activeStepStore.activeStepIndex].groups[
      dtreeModalStore.groupIndexToChange
    ].length
  }

  public get currentStepGroups(): string[] {
    return dtreeStore.currentStepGroups
  }

  public get statList(): StatList[] {
    return dtreeStore.startDtreeStat['stat-list']
  }

  public get problemGroups(): string[] {
    return (
      this.statList.find((item: any) => item.name === this.groupName)?.family ??
      []
    )
  }

  public get approxModes() {
    return (
      this.statList.find((item: any) => item.name === this.groupName)?.[
        'approx-modes'
      ] ?? []
    )
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
