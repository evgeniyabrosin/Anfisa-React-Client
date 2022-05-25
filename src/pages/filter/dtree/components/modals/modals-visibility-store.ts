import { makeAutoObservable } from 'mobx'

import dtreeStore from '@store/dtree'

class ModalsVisibilityStore {
  groupNameToChange = ''
  groupIndexToChange = 0
  dtreeOperation = ''
  modalSource = ''

  isModalAttributeVisible = false
  isModalJoinVisible = false

  isModalInheritanceModeVisible = false
  isModalCustomInheritanceModeVisible = false
  isModalCompoundHetVisible = false
  isModalCompoundRequestVisible = false
  isModalGeneRegionVisible = false

  isModalEnumVisible = false
  isModalNumericVisible = false

  isModalTextEditorVisible = false

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

  public openModalJoin = () => {
    this.isModalJoinVisible = true
  }

  public closeModalJoin() {
    this.isModalJoinVisible = false
  }

  // 2. Modal for numeric attr

  public openModalNumeric(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isModalNumericVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalNumeric = (): void => {
    this.isModalNumericVisible = false
  }

  // 3. Modal for enum attr

  public openModalEnum(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isModalEnumVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalEnum = () => {
    this.isModalEnumVisible = false
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

  // 5. Modal for editing dtree code (new / loaded)

  public openModalTextEditor() {
    this.isModalTextEditorVisible = true
  }

  public closeModalTextEditor() {
    this.isModalTextEditorVisible = false
  }
}

export default new ModalsVisibilityStore()
