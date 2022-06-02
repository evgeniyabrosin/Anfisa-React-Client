import { makeAutoObservable } from 'mobx'

import dtreeStore from '@store/dtree'

class ModalsVisibilityStore {
  groupNameToChange = ''
  groupIndexToChange = 0
  dtreeOperation = ''
  modalSource = ''

  isModalAttributeVisible = false

  isModalInheritanceModeVisible = false
  isModalCustomInheritanceModeVisible = false
  isModalCompoundHetVisible = false
  isModalCompoundRequestVisible = false
  isModalGeneRegionVisible = false

  isEnumDialogVisible = false
  isNumericDialogVisible = false

  isModalViewVariantsVisible = false
  tableModalIndexNumber: null | number = null

  constructor() {
    makeAutoObservable(this)
  }

  // 1. Modals for creation brand new tree

  public openModalAttribute() {
    this.isModalAttributeVisible = true
  }

  public closeModalAttribute() {
    this.isModalAttributeVisible = false
  }

  // 2. Modal for numeric attr

  public openNumericDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isNumericDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeNumericDialog = (): void => {
    this.isNumericDialogVisible = false
  }

  // 3. Modal for enum attr

  public openEnumDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isEnumDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeEnumDialog = () => {
    this.isEnumDialogVisible = false
    dtreeStore.resetSelectedFilters()
  }

  // 4. Modals for func attr

  public openModalInheritanceMode(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isModalInheritanceModeVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalInheritanceMode() {
    this.isModalInheritanceModeVisible = false
  }

  public openModalCustomInheritanceMode(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isModalCustomInheritanceModeVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalCustomInheritanceMode() {
    this.isModalCustomInheritanceModeVisible = false
  }

  public openModalCompoundHet(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isModalCompoundHetVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalCompoundHet() {
    this.isModalCompoundHetVisible = false
  }

  public openModalCompoundRequest(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isModalCompoundRequestVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public openModalCustomInheritanceModeFunc(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isModalCustomInheritanceModeVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalCompoundRequest() {
    this.isModalCompoundRequestVisible = false
  }

  public openModalGeneRegion(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isModalGeneRegionVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalGeneRegion() {
    this.isModalGeneRegionVisible = false
  }

  // 5 Common UI/UX modals

  openModalViewVariants(index?: number) {
    this.isModalViewVariantsVisible = true

    if (index) this.tableModalIndexNumber = index
  }

  closeModalViewVariants = () => {
    this.isModalViewVariantsVisible = false
    this.tableModalIndexNumber = null
  }
}

export default new ModalsVisibilityStore()
