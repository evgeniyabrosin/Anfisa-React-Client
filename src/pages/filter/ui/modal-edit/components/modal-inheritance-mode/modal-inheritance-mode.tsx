import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import { InheritanceModeContent } from '@pages/filter/ui/modal-edit/components/modal-inheritance-mode/components/inheritance-mode-content'
import { HeaderModal } from '@pages/filter/ui/query-builder/ui/header-modal'
import { ModalBase } from '@pages/filter/ui/query-builder/ui/modal-base'
import { SelectModalButtons } from '@pages/filter/ui/query-builder/ui/select-modal-buttons'
import dtreeModalStore from '../../../../modals.store'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalInheritanceModeStore from './modal-inheritance-mode.store'

export const ModalInheritanceMode = observer((): ReactElement => {
  const { groupName, problemGroups, currentStepGroups } = modalEditStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  const selectedGroupsAmount = currentGroup ? dtreeStore.selectedFilters : []

  const [selectedProblemGroups, setSelectedProblemGroups] = useState<string[]>(
    currentGroup
      ? (Object.values(currentGroup[currentGroup.length - 1])[0] as string[])
      : [],
  )

  useEffect(() => {
    if (currentGroup) {
      modalInheritanceModeStore.checkExistedSelectedFilters(currentGroup)
    }
  }, [currentGroup])

  useEffect(() => {
    const params = `{"problem_group":["${selectedProblemGroups
      .toString()
      .split(',')
      .join('","')}"]}`

    modalInheritanceModeStore.fetchStatFunc(groupName, params)

    return () => {
      dtreeStore.resetSelectedFilters()
      dtreeStore.resetStatFuncData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setProblemGroups = (checked: boolean, value: string) => {
    modalInheritanceModeStore.setProblemGroups({
      checked,
      value,
      groupName,
      setSelectedProblemGroups,
    })
  }

  const addAttribute = (action: ActionType) => {
    modalInheritanceModeStore.addAttribute(action, selectedProblemGroups)
  }

  return (
    <ModalBase minHeight={340}>
      <HeaderModal
        groupName={dtreeModalStore.groupNameToChange}
        handleClose={() => modalInheritanceModeStore.closeModal()}
      />

      <InheritanceModeContent
        problemGroups={problemGroups}
        setProblemGroups={setProblemGroups}
        selectedProblemGroups={selectedProblemGroups}
        handleReset={() =>
          modalInheritanceModeStore.resetProblemGroups(
            groupName,
            setSelectedProblemGroups,
          )
        }
      />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalInheritanceModeStore.closeModal()}
          handleSaveChanges={() =>
            modalInheritanceModeStore.saveChanges(selectedProblemGroups)
          }
          disabled={
            selectedGroupsAmount.length === 0 ||
            selectedProblemGroups.length === 0
          }
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalInheritanceModeStore.closeModal()}
          handleModals={() => modalInheritanceModeStore.openModalAttribute()}
          handleModalJoin={() => modalEditStore.openModalJoin()}
          handleAddAttribute={addAttribute}
          disabled={dtreeStore.selectedFilters.length === 0}
          currentGroup={currentGroupToModify ?? currentStepGroups}
        />
      )}
    </ModalBase>
  )
})
