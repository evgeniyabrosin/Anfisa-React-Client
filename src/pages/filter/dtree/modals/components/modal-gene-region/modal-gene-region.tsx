import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/active-step.store'
import dtreeModalStore from '@pages/filter/dtree/modals/modals-visibility.store'
import { SelectModalButtons } from '@pages/filter/dtree/ui/query-builder/ui/select-modal-buttons'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import { GeneRegionContent } from '../../../ui/query-builder/ui/gene-region-content'
import { HeaderModal } from '../../../ui/query-builder/ui/header-modal'
import { ModalBase } from '../../../ui/query-builder/ui/modal-base'
import modalEditStore from '../../modals-control.strore'
import { EditModalButtons } from '../edit-modal-buttons'
import modalGeneRegionStore from './modal-gene-region.store'

export const ModalGeneRegion = observer((): ReactElement => {
  const {
    groupName,
    variants,

    currentStepGroups,
  } = modalEditStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  const { locusCondition } = modalGeneRegionStore

  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleSetValue = (value: string) => {
    modalGeneRegionStore.setLocusCondition(value)
  }

  const validateValue = (value: string) => {
    validateLocusCondition({
      value,
      setIsErrorVisible,
      groupName,
      currentStepIndex,
    })
  }

  const handleAddAttribute = (action: ActionType) => {
    modalGeneRegionStore.addAttribute(action)
  }

  useEffect(() => {
    if (currentGroup) {
      modalGeneRegionStore.fetchStatFunc(currentGroup)
    }

    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalBase minHeight={250}>
      <HeaderModal
        groupName={dtreeModalStore.groupNameToChange}
        handleClose={() => modalGeneRegionStore.closeModal()}
      />

      <GeneRegionContent
        locusCondition={locusCondition}
        validateValue={validateValue}
        handleSetValue={handleSetValue}
        isErrorVisible={isErrorVisible}
        variants={variants}
      />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalGeneRegionStore.closeModal()}
          handleSaveChanges={() => modalGeneRegionStore.saveChanges()}
          disabled={isErrorVisible}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalGeneRegionStore.closeModal()}
          handleModals={() => modalGeneRegionStore.openModalAttribute()}
          handleModalJoin={() => modalEditStore.openModalJoin()}
          handleAddAttribute={handleAddAttribute}
          disabled={isErrorVisible}
          currentGroup={currentGroupToModify ?? currentStepGroups}
        />
      )}
    </ModalBase>
  )
})
