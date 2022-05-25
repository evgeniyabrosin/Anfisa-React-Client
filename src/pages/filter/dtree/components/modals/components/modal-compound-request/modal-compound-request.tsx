import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { ApproxStateModalMods } from '@pages/filter/dtree/components/query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '@pages/filter/dtree/components/query-builder/ui/disabled-variants-amount'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'
import { RequestBlock } from './components/request-block'
import { RequestControlButtons } from './components/request-control-buttons'
import modalCompoundRequestStore from './modal-compound-request.store'

export const ModalCompoundRequest = observer((): ReactElement => {
  const { variants, groupName, currentStepGroups } = modalsControlStore

  const { requestCondition, activeRequestIndex, approx } =
    modalCompoundRequestStore

  const currentStepIndex = stepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange

  const currentGroup =
    stepStore.steps[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = stepStore.steps[currentStepIndex].groups

  const handleSetCondition = (approx: ApproxNameTypes) => {
    modalCompoundRequestStore.setApprox(approx)
  }

  useEffect(() => {
    if (currentGroup) {
      modalCompoundRequestStore.checkExistedSelectedFilters(currentGroup)

      return
    }

    modalCompoundRequestStore.setApprox(
      datasetStore.isXL
        ? ApproxNameTypes.Non_Intersecting_Transcript
        : ApproxNameTypes.Shared_Gene,
    )

    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddAttribute = (action: ActionType) => {
    modalCompoundRequestStore.addAttribute(action)
  }

  return (
    <ModalBase minHeight={300}>
      <HeaderModal
        groupName={groupName}
        handleClose={() => modalCompoundRequestStore.closeModal()}
      />

      <div className="flex justify-between w-full mt-4 text-14">
        <ApproxStateModalMods
          approx={approx}
          handleSetCondition={handleSetCondition}
        />

        <AllNotMods
          isNotModeChecked={
            modalCompoundRequestStore.currentMode === ModeTypes.Not
          }
          isNotModeDisabled={variants ? variants.length === 0 : true}
          toggleNotMode={() =>
            modalCompoundRequestStore.setCurrentMode(ModeTypes.Not)
          }
        />
      </div>

      <div className="flex flex-col w-full mt-4 text-14">
        {requestCondition.map(([requestBlockNumber], index) => (
          <RequestBlock
            key={index}
            index={index}
            activeRequestIndex={activeRequestIndex}
            requestBlockNumber={requestBlockNumber}
          />
        ))}
      </div>

      <RequestControlButtons />

      <DisabledVariantsAmount variants={variants} disabled={true} />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalCompoundRequestStore.closeModal()}
          handleSaveChanges={() => modalCompoundRequestStore.saveChanges()}
          disabled={!variants}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalCompoundRequestStore.closeModal()}
          handleModals={() => modalCompoundRequestStore.openModalAttribute()}
          handleModalJoin={() => modalsControlStore.openModalJoin()}
          disabled={!variants}
          currentGroup={currentGroupToModify ?? currentStepGroups}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
