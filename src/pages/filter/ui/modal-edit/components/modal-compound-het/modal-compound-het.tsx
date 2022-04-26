import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import { AllNotMods } from '@pages/filter/ui/query-builder/ui/all-not-mods'
import { SelectModalButtons } from '@pages/filter/ui/query-builder/ui/select-modal-buttons'
import dtreeModalStore from '../../../../modals.store'
import { ApproxStateModalMods } from '../../../query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '../../../query-builder/ui/disabled-variants-amount'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalCompoundHetStore from './modal-compound-het.store'

export const ModalCompoundHet = observer((): ReactElement => {
  const { variants, currentStepGroups } = modalEditStore

  const { approx } = modalCompoundHetStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  useEffect(() => {
    if (currentGroup) {
      modalCompoundHetStore.fetchStatFunc(currentGroup)

      return
    }

    modalCompoundHetStore.setApprox(
      datasetStore.isXL
        ? ApproxNameTypes.Non_Intersecting_Transcript
        : ApproxNameTypes.Shared_Gene,
    )

    return () => dtreeStore.resetStatFuncData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetCondition = (value: ApproxNameTypes) => {
    modalCompoundHetStore.setApprox(value)
  }

  const handleAddAttribute = (action: ActionType) => {
    modalCompoundHetStore.addAttribute(action)
  }

  return (
    <ModalBase minHeight={250}>
      <HeaderModal
        groupName={dtreeModalStore.groupNameToChange}
        handleClose={() => modalCompoundHetStore.closeModal()}
      />

      <div className="flex justify-between w-full mt-4 text-14">
        <ApproxStateModalMods
          approx={approx}
          handleSetCondition={handleSetCondition}
        />

        <AllNotMods
          isNotModeChecked={modalCompoundHetStore.currentMode === ModeTypes.Not}
          isNotModeDisabled={variants ? variants.length === 0 : true}
          toggleNotMode={() =>
            modalCompoundHetStore.setCurrentMode(ModeTypes.Not)
          }
        />
      </div>

      <DisabledVariantsAmount variants={variants} disabled={true} />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalCompoundHetStore.closeModal()}
          handleSaveChanges={() => modalCompoundHetStore.saveChanges()}
          disabled={!variants}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalCompoundHetStore.closeModal()}
          handleModals={() => modalCompoundHetStore.openModalAttribute()}
          handleModalJoin={() => modalEditStore.openModalJoin()}
          disabled={!variants}
          currentGroup={currentGroupToModify ?? currentStepGroups}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
