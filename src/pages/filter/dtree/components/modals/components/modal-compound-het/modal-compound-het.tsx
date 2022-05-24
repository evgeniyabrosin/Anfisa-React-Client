import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { ApproxStateModalMods } from '../../../query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '../../../query-builder/ui/disabled-variants-amount'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'
import modalCompoundHetStore from './modal-compound-het.store'

export const ModalCompoundHet = observer((): ReactElement => {
  const { variants, currentStepGroups } = modalsControlStore

  const { approx } = modalCompoundHetStore

  const currentStepIndex = stepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange

  const currentGroup =
    stepStore.steps[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = stepStore.steps[currentStepIndex].groups

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
        groupName={modalsVisibilityStore.groupNameToChange}
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
          handleModalJoin={() => modalsControlStore.openModalJoin()}
          disabled={!variants}
          currentGroup={currentGroupToModify ?? currentStepGroups}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
