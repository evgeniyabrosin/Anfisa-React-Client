import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { NumericCondition } from '@components/numeric-condition'
import activeStepStore from '@pages/filter/active-step.store'
import { EditModalButtons } from '@pages/filter/ui/modal-edit/components/edit-modal-buttons'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import dtreeModalStore from '../../../../modals.store'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import { SelectModalButtons } from '../../../query-builder/ui/select-modal-buttons'

export const ModalNumbers = observer((): ReactElement | null => {
  const groups = dtreeStore.currentStepGroups

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  const initialValue = currentGroup
    ? currentGroup[currentGroup.length - 1]
    : undefined

  const attr = dtreeStore.attributeStatusToChange

  if (!attr || attr.kind !== 'numeric') {
    return null
  }

  const handleClose = () => {
    dtreeModalStore.closeModalNumbers()
  }

  const handleModals = () => {
    handleClose()
    dtreeModalStore.openModalAttribute()
  }

  const handleModalJoin = () => {
    dtreeModalStore.openModalJoin()
  }

  return (
    <ModalBase minHeight={200}>
      <HeaderModal
        groupName={attr.title ?? attr.name}
        handleClose={handleClose}
      />
      <NumericCondition
        className="pt-3"
        attrData={attr}
        initialValue={initialValue}
        controls={({ value, hasErrors }) => {
          const disabled = hasErrors || (value[0] == null && value[2] == null)

          return currentGroup ? (
            <EditModalButtons
              handleClose={handleClose}
              handleSaveChanges={() => {
                changeNumericAttribute(value)
                handleClose()
              }}
              disabled={disabled}
            />
          ) : (
            <SelectModalButtons
              currentGroup={currentGroupToModify ?? groups}
              handleClose={handleClose}
              handleModals={handleModals}
              handleModalJoin={handleModalJoin}
              disabled={disabled}
              handleAddAttribute={action => {
                addAttributeToStep(action, 'numeric', value)
                handleClose()
              }}
            />
          )
        }}
      />
    </ModalBase>
  )
})
