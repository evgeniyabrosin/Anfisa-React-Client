import { makeAutoObservable } from 'mobx'

import { ActionType, StatList } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import {
  EnumPropertyStatusSubKinds,
  TEnumCondition,
} from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import modalsVisibilityStore from '../../modals-visibility-store'

class ModalEnumStore {
  searchValue = ''
  currentPage = 0
  isAllFiltersChecked = false

  groupsPerPage = 100

  currentMode?: ModeTypes
  currentGroupSubKind?: EnumPropertyStatusSubKinds

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentMode(modeType: ModeTypes) {
    this.currentMode = modeType
  }

  public resetCurrentMode() {
    this.currentMode = undefined
  }

  public setCurrentGroupSubKind(subKind: EnumPropertyStatusSubKinds) {
    this.currentGroupSubKind = subKind
  }

  public resetCurrentGroupSubKind() {
    this.currentGroupSubKind = undefined
  }

  public setSearchValue(value: string) {
    this.searchValue = value
  }

  public setCurrentPage(value: number) {
    this.currentPage = value
  }

  public setIsAllFiltersChecked(value: boolean) {
    this.isAllFiltersChecked = value
  }

  public selectCheckGroupItem(checked: boolean, name: string): void {
    if (checked) {
      dtreeStore.addSelectedFilter(name)
    } else {
      dtreeStore.removeSelectedFilter(name)
    }
  }

  public selectAllGroupItems(checked: boolean): void {
    if (checked && this.isAllFiltersChecked) return

    const groupNameList = this.filteredGroupList.map(([groupName]) => groupName)

    if (checked) {
      dtreeStore.addSelectedFilterList(groupNameList)
    } else {
      dtreeStore.resetSelectedFilters()
    }

    this.setIsAllFiltersChecked(checked)
  }

  public saveChanges(): void {
    changeEnumAttribute(this.currentMode)
    modalsVisibilityStore.closeModalEnum()
    this.resetData()
  }

  public addAttribute(action: ActionType): void {
    addAttributeToStep(action, 'enum', null, null, this.currentMode)

    dtreeStore.resetSelectedFilters()
    modalsVisibilityStore.closeModalEnum()
    this.resetData()
  }

  public checkIfSelectedFiltersExist(currentGroup: TEnumCondition) {
    dtreeStore.stepData[activeStepStore.activeStepIndex].groups[
      modalsVisibilityStore.groupIndexToChange
    ][modalsControlStore.currentGroupLength - 1].forEach((item: string) =>
      dtreeStore.addSelectedFilter(item),
    )

    if (currentGroup) {
      const conditionJoinType = currentGroup[2]

      this.currentMode = getCurrentModeType(conditionJoinType)
    }
  }

  public closeModal(): void {
    modalsVisibilityStore.closeModalEnum()

    dtreeStore.resetSelectedFilters()
    this.resetData()
  }

  public openModalAttribute(): void {
    modalsVisibilityStore.closeModalEnum()
    modalsVisibilityStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  private resetData(): void {
    this.searchValue = ''
    this.currentPage = 0
    this.isAllFiltersChecked = false

    this.resetCurrentMode()
    this.currentGroupSubKind = undefined
  }

  public get originGroupList(): [string, number][] {
    const selectedGroup = modalsControlStore.attributeStatusToChange as StatList

    // TODO: getter should not have side effects
    this.currentGroupSubKind = selectedGroup?.['sub-kind']

    return selectedGroup?.variants ?? []
  }

  public get filteredGroupList(): [string, number][] {
    return this.originGroupList.filter((variant: [string, number]) =>
      variant[0]
        .toLocaleLowerCase()
        .includes(this.searchValue.toLocaleLowerCase()),
    )
  }

  public get groupsPage(): [string, number][] {
    return this.filteredGroupList.slice(
      this.currentPage * this.groupsPerPage,
      (this.currentPage + 1) * this.groupsPerPage,
    )
  }

  public get pagesNumbers(): number {
    return Math.ceil(this.filteredGroupList.length / this.groupsPerPage)
  }
}

export default new ModalEnumStore()
