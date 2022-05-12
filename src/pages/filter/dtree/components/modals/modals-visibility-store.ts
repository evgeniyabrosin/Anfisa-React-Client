import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import {
  ActionTypes,
  DtreeModifyingActions,
} from '@service-providers/decision-trees'
import { showToast } from '@utils/notifications/showToast'

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
  isModalNumbersVisible = false

  isModalTextEditorVisible = false
  isModalConfirmationVisible = false

  constructor() {
    makeAutoObservable(this)
  }

  public deleteTree(): void {
    const notification: string = `${t('dtree.dtree')} "${
      dtreeStore.currentDtreeName
    }" ${t('dtree.hasBeenDeleted')}`

    dtreeStore.fetchDtreeSetAsync({
      ds: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
      instr: [
        ActionTypes.DTREE,
        DtreeModifyingActions.DELETE,
        dtreeStore.currentDtreeName,
      ],
    })

    showToast(notification, 'success')

    dtreeStore.setActionName()

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

  public closeModalEnum() {
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
