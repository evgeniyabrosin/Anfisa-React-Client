import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { NumericCondition } from '@components/numeric-condition'
import { EditModalButtons } from '@pages/filter/dtree/components/modals/components/edit-modal-buttons'
import dtreeModalStore from '@pages/filter/dtree/components/modals/modals-visibility.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import { HeaderModal } from '../../../ui/query-builder/ui/header-modal'
import { SelectModalButtons } from '../../../ui/query-builder/ui/select-modal-buttons'
import modalEditStore from '../../modals-control.strore'
import { ModalBase } from '../modal-base'

export const ModalNumbers = observer((): ReactElement | null => {
  const groups = modalEditStore.currentStepGroups
  const currentGroup = modalEditStore.currentGroupToChange

  const initialValue = currentGroup
    ? currentGroup[currentGroup.length - 1]
    : undefined

  const attr = modalEditStore.attributeStatusToChange

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
