import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import dtreeModalStore from '@pages/filter/dtree/components/modals/modals-visibility.store'
import { SelectModalButtons } from '@pages/filter/dtree/components/ui/query-builder/ui/select-modal-buttons'
import { CustomInheritanceModeContent } from '../../../../../common/custom-inheritance-mode-content'
import { HeaderModal } from '../../../ui/query-builder/ui/header-modal'
import modalEditStore from '../../modals-control.strore'
import { EditModalButtons } from '../edit-modal-buttons'
import { ModalBase } from '../modal-base'
import modalCustomInheritanceModeStore from './modal-custom-inheritance-mode.store'

export const ModalCustomInheritanceMode = observer((): ReactElement => {
  const { variants, problemGroups, currentStepGroups } = modalEditStore

  const selectValues = modalCustomInheritanceModeStore.selectValues

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

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
        groupName={dtreeModalStore.groupNameToChange}
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
          handleModalJoin={() => modalEditStore.openModalJoin()}
          handleAddAttribute={handleAddAttribute}
          disabled={!variants}
          currentGroup={currentGroupToModify ?? currentStepGroups}
        />
      )}
    </ModalBase>
  )
})