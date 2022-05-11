import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import { GeneRegionContent } from '../../../query-builder/ui/gene-region-content'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'
import modalGeneRegionStore from './modal-gene-region.store'

export const ModalGeneRegion = observer((): ReactElement => {
  const { variants, currentStepGroups } = modalsControlStore
  const { locusCondition } = modalGeneRegionStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  const [error, setError] = useState<string>('')

  const handleSetValue = async (value: string) => {
    modalGeneRegionStore.setLocusCondition(value)

    const result = await dtreeStore.fetchStatFuncAsync(
      FuncStepTypesEnum.GeneRegion,
      `{"locus":"${value}"}`,
    )

    if (result.err) {
      setError(result.err)
    }

    if (!result.err && error) {
      setError('')
    }
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
        handleSetValue={handleSetValue}
        error={error}
        variants={variants}
      />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalGeneRegionStore.closeModal()}
          handleSaveChanges={() => modalGeneRegionStore.saveChanges()}
          disabled={!!error}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalGeneRegionStore.closeModal()}
          handleModals={() => modalGeneRegionStore.openModalAttribute()}
          handleModalJoin={() => modalsControlStore.openModalJoin()}
          handleAddAttribute={handleAddAttribute}
          disabled={!!error}
          currentGroup={currentGroupToModify ?? currentStepGroups}
        />
      )}
    </ModalBase>
  )
})
