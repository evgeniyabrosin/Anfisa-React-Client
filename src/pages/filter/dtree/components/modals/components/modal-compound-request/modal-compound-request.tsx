import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import { SelectModalButtons } from '@pages/filter/dtree/components/modals/components/ui/select-modal-buttons'
import dtreeModalStore from '@pages/filter/dtree/components/modals/modals-visibility.store'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { ApproxStateModalMods } from '@pages/filter/dtree/components/query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '@pages/filter/dtree/components/query-builder/ui/disabled-variants-amount'
import modalEditStore from '../../modals-control.strore'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { RequestBlock } from './components/request-block'
import { RequestControlButtons } from './components/request-control-buttons'
import modalCompoundRequestStore from './modal-compound-request.store'

export const ModalCompoundRequest = observer((): ReactElement => {
  const {
    variants,
    approxValues,
    approxOptions,
    groupName,
    currentStepGroups,
  } = modalEditStore

  const {
    stateCondition,
    requestCondition,
    approxCondition,
    stateOptions,
    activeRequestIndex,
  } = modalCompoundRequestStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  const handleSetCondition = (value: string, type: string) => {
    modalCompoundRequestStore.setCondition(value, type)
  }

  useEffect(() => {
    if (currentGroup) {
      modalCompoundRequestStore.checkExistedSelectedFilters(currentGroup)
    }

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
          approxOptions={approxOptions}
          approxValues={approxValues}
          approxCondition={approxCondition}
          stateOptions={stateOptions}
          stateCondition={stateCondition}
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
        {requestCondition.map((item: any[], index: number) => (
          <RequestBlock
            key={item[index] + index}
            index={index}
            activeRequestIndex={activeRequestIndex}
            item={item}
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
          handleModalJoin={() => modalEditStore.openModalJoin()}
          disabled={!variants}
          currentGroup={currentGroupToModify ?? currentStepGroups}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
