import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import { SelectModalButtons } from '@pages/filter/dtree/components/modals/components/ui/select-modal-buttons'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility.store'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import modalsControlStore from '../../modals-control.store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { GeneRegionContent } from './gene-region-content'
import modalGeneRegionStore from './modal-gene-region.store'

export const ModalGeneRegion = observer((): ReactElement => {
  const {
    groupName,
    variants,

    currentStepGroups,
  } = modalsControlStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange

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
        groupName={modalsVisibilityStore.groupNameToChange}
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
          handleModalJoin={() => modalsVisibilityStore.openModalJoin()}
          handleAddAttribute={handleAddAttribute}
          disabled={isErrorVisible}
          currentGroup={currentGroupToModify ?? currentStepGroups}
        />
      )}
    </ModalBase>
  )
})
