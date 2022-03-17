import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { showToast } from '@utils/notifications/showToast'

class DtreeModalStore {
  groupNameToChange = ''
  groupIndexToChange = 0
  dtreeOperation = ''
  modalSource = ''

  isModalAttributeVisible = false
  isModalJoinVisible = false
  isModalNumbersVisible = false

  isModalEditFiltersVisible = false
  isModalEditInheritanceModeVisible = false
  isModalEditCustomInheritanceModeVisible = false
  isModalEditCompoundHetVisible = false
  isModalEditCompoundRequestVisible = false
  isModalEditGeneRegionVisible = false

  isModalSelectFilterVisible = false
  isModalSelectInheritanceModeVisible = false
  isModalSelectCustomInheritanceModeVisible = false
  isModalSelectCompoundHetVisible = false
  isModalSelectCompoundRequestVisible = false
  isModalSelectGeneRegionVisible = false

  isModalTextEditorVisible = false
  isModalConfirmationVisible = false

  constructor() {
    makeAutoObservable(this)
  }

  public deleteTree(): void {
    const instruction: string[] = [
      'DTREE',
      'DELETE',
      dtreeStore.currentDtreeName,
    ]

    const notification: string = `${t('dtree.dtree')} "${
      dtreeStore.currentDtreeName
    }" ${t('dtree.hasBeenDeleted')}`

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
      instr: JSON.stringify(instruction),
    })

    dtreeStore.fetchDtreeSetAsync(body)

    showToast(notification, 'success')

    filterStore.setActionName()

    dtreeStore.resetCurrentDtreeName()
  }

  public openModalConfirmation(dtreeOperation: string): void {
    this.isModalConfirmationVisible = true
    this.dtreeOperation = dtreeOperation
  }

  public closeModalConfirmation(): void {
    this.isModalConfirmationVisible = false
  }

  // 1. Modals for creation brand new tree

  public openModalAttribute() {
    this.isModalAttributeVisible = true
  }

  public closeModalAttribute() {
    this.isModalAttributeVisible = false
  }

  public openModalJoin() {
    this.isModalJoinVisible = true
  }

  public closeModalJoin() {
    this.isModalJoinVisible = false
  }

  // 2. Modal for numeric attr

  public openModalNumbers(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isModalNumbersVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeModalNumbers() {
    this.isModalNumbersVisible = false
  }

  // 3. Modal for enum attr

  public openModalSelectFilter(groupName: string, source: string) {
    this.modalSource = source

    this.isModalSelectFilterVisible = true
    this.groupNameToChange = groupName
  }

  public closeModalSelectFilter() {
    this.isModalSelectFilterVisible = false
  }

  public openModalEditFilters(groupName: string, groupIndex: number) {
    this.isModalEditFiltersVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  public closeModalEditFilters() {
    this.isModalEditFiltersVisible = false
    dtreeStore.resetSelectedFilters()
  }

  // 4. Modals for func attr

  public openModalEditInheritanceMode(groupName: string, groupIndex: number) {
    this.isModalEditInheritanceModeVisible = true

    this.groupNameToChange = groupName

    this.groupIndexToChange = groupIndex
  }

  public closeModalEditInheritanceMode() {
    this.isModalEditInheritanceModeVisible = false
  }

  public openModalEditCustomInheritanceMode(
    groupName: string,
    groupIndex: number,
  ) {
    this.isModalEditCustomInheritanceModeVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  public closeModalEditCustomInheritanceMode() {
    this.isModalEditCustomInheritanceModeVisible = false
  }

  public openModalEditCompoundHet(groupName: string, groupIndex: number) {
    this.isModalEditCompoundHetVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  public closeModalEditCompoundHet() {
    this.isModalEditCompoundHetVisible = false
  }

  public openModalEditCompoundRequest(groupName: string, groupIndex: number) {
    this.isModalEditCompoundRequestVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  public openModalEditCustomInheritanceModeFunc(
    groupName: string,
    groupIndex: number,
  ) {
    this.isModalEditCompoundRequestVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  public closeModalEditCompoundRequest() {
    this.isModalEditCompoundRequestVisible = false
  }

  public openModalEditGeneRegion(groupName: string, groupIndex: number) {
    this.isModalEditGeneRegionVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  public closeModalEditGeneRegion() {
    this.isModalEditGeneRegionVisible = false
  }

  public openModalSelectInheritanceMode(groupName: string, source: string) {
    this.modalSource = source

    this.isModalSelectInheritanceModeVisible = true

    this.groupNameToChange = groupName
  }

  public closeModalSelectInheritanceMode() {
    this.isModalSelectInheritanceModeVisible = false
  }

  public openModalSelectCustomInheritanceMode(
    groupName: string,
    source: string,
  ) {
    this.modalSource = source

    this.isModalSelectCustomInheritanceModeVisible = true

    this.groupNameToChange = groupName
  }

  public closeModalSelectCustomInheritanceMode() {
    this.isModalSelectCustomInheritanceModeVisible = false
  }

  public openModalSelectCompoundHet(groupName: string, source: string) {
    this.modalSource = source

    this.isModalSelectCompoundHetVisible = true

    this.groupNameToChange = groupName
  }

  public closeModalSelectCompoundHet() {
    this.isModalSelectCompoundHetVisible = false
  }

  public openModalSelectCompoundRequest(groupName: string, source: string) {
    this.modalSource = source

    this.isModalSelectCompoundRequestVisible = true

    this.groupNameToChange = groupName
  }

  public closeModalSelectCompoundRequest() {
    this.isModalSelectCompoundRequestVisible = false
  }

  public openModalSelectGeneRegion(groupName: string, source: string) {
    this.modalSource = source

    this.isModalSelectGeneRegionVisible = true
    this.groupNameToChange = groupName
  }

  public closeModalSelectGeneRegion() {
    this.isModalSelectGeneRegionVisible = false
  }

  // 5. Modal for editing dtree code (new / loaded)

  public openModalTextEditor() {
    this.isModalTextEditorVisible = true
  }

  public closeModalTextEditor() {
    this.isModalTextEditorVisible = false
  }
}

export default new DtreeModalStore()
