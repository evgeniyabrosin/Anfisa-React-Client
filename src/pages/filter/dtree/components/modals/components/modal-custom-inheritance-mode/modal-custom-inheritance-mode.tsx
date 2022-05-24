import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { CustomInheritanceModeContent } from '../../../query-builder/ui/custom-inheritance-mode-content'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'
import modalCustomInheritanceModeStore from './modal-custom-inheritance-mode.store'

export const ModalCustomInheritanceMode = observer((): ReactElement => {
  const { variants, problemGroups, currentStepGroups } = modalsControlStore

  const selectValues = modalCustomInheritanceModeStore.selectValues

  const currentStepIndex = stepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange

  const currentGroup =
    stepStore.steps[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = stepStore.steps[currentStepIndex].groups

  useEffect(() => {
    if (currentGroup) {
      modalCustomInheritanceModeStore.checkExistedSelectedFilters(currentGroup)
    }
    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectStates = [
    selectValues.first,
    selectValues.second,
    selectValues.third,
  ]

  const handleSetSingleScenario = (group: string, value: string) => {
    modalCustomInheritanceModeStore.setSingleScenario(group, value)
  }

  const handleSetComplexScenario = (name: string) => {
    modalCustomInheritanceModeStore.prepareAndSetComplexScenario(name)
  }

  const handleAddAttribute = (action: ActionType) => {
    modalCustomInheritanceModeStore.addAttribute(action)
  }

  return (
    <ModalBase minHeight={250}>
      <HeaderModal
        groupName={modalsVisibilityStore.groupNameToChange}
        handleClose={() => modalCustomInheritanceModeStore.closeModal()}
      />

      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={handleSetSingleScenario}
        selectStates={selectStates}
        handleReset={handleSetComplexScenario}
        resetValue={modalCustomInheritanceModeStore.resetValue}
        isNotModeChecked={
          modalCustomInheritanceModeStore.currentMode === ModeTypes.Not
        }
        toggleNotMode={() =>
          modalCustomInheritanceModeStore.setCurrentMode(ModeTypes.Not)
        }
      />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalCustomInheritanceModeStore.closeModal()}
          handleSaveChanges={() =>
            modalCustomInheritanceModeStore.saveChanges()
          }
          disabled={!variants}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalCustomInheritanceModeStore.closeModal()}
          handleModals={() =>
            modalCustomInheritanceModeStore.openModalAttribute()
          }
          handleModalJoin={() => modalsControlStore.openModalJoin()}
          handleAddAttribute={handleAddAttribute}
          disabled={!variants}
          currentGroup={currentGroupToModify ?? currentStepGroups}
        />
      )}
    </ModalBase>
  )
})
