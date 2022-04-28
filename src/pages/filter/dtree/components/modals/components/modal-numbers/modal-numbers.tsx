import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { NumericCondition } from '@components/numeric-condition'
import { EditModalButtons } from '@pages/filter/dtree/components/modals/components/ui/edit-modal-buttons'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'

export const ModalNumbers = observer((): ReactElement | null => {
  const groups = modalsControlStore.currentStepGroups
  const currentGroup = modalsControlStore.currentGroupToChange

  const initialValue = currentGroup
    ? currentGroup[currentGroup.length - 1]
    : undefined

  const attr = modalsControlStore.attributeStatusToChange

  if (!attr || attr.kind !== 'numeric') {
    return null
  }

  const handleClose = () => {
    modalsVisibilityStore.closeModalNumbers()
  }

  const handleModals = () => {
    handleClose()
    modalsVisibilityStore.openModalAttribute()
  }

  const handleModalJoin = () => {
    modalsVisibilityStore.openModalJoin()
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
              currentGroup={groups}
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
