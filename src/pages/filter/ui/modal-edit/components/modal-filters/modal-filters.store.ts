import { makeAutoObservable, toJS } from 'mobx'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import dtreeModalStore from '../../../../modals.store'

class ModalFiltersStore {
  searchValue = ''
  currentPage = 0
  isAllFiltersChecked = false

  originGroupList: any[] = toJS(dtreeStore.selectedGroups[2]) ?? []

  groupsPerPage = 100

  constructor() {
    makeAutoObservable(this)
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
    changeEnumAttribute()
    dtreeModalStore.closeModalFilters()
    this.resetData()
  }

  public addAttribute(action: ActionType): void {
    addAttributeToStep(action, 'enum')

    dtreeStore.resetSelectedFilters()
    dtreeModalStore.closeModalFilters()
    this.resetData()
  }

  public checkIfSelectedFiltersExist() {
    dtreeStore.stepData[activeStepStore.activeStepIndex].groups[
      dtreeModalStore.groupIndexToChange
    ][modalEditStore.currentGroupLength - 1].forEach((item: string) =>
      dtreeStore.addSelectedFilter(item),
    )
  }

  public closeModal(): void {
    dtreeModalStore.closeModalFilters()

    dtreeStore.resetSelectedFilters()
    this.resetData()
  }

  public openModalAttribute(): void {
    dtreeModalStore.closeModalFilters()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  private resetData(): void {
    this.searchValue = ''
    this.currentPage = 0
    this.isAllFiltersChecked = false

    this.originGroupList = toJS(dtreeStore.selectedGroups[2]) ?? []
  }

  get filteredGroupList(): [string, number][] {
    const originGroupList: [string, number][] =
      toJS(dtreeStore.selectedGroups[2]) ?? []

    return originGroupList.filter((variant: [string, number]) =>
      variant[0]
        .toLocaleLowerCase()
        .includes(this.searchValue.toLocaleLowerCase()),
    )
  }

  get groupsPage(): [string, number][] {
    return this.filteredGroupList.slice(
      this.currentPage * this.groupsPerPage,
      (this.currentPage + 1) * this.groupsPerPage,
    )
  }

  get pagesNumbers(): number {
    return Math.ceil(this.filteredGroupList.length / this.groupsPerPage)
  }
}

export default new ModalFiltersStore()
