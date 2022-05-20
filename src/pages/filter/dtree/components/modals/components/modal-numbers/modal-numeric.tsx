import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { NumericCondition } from '@components/numeric-condition'
import { EditModalButtons } from '@pages/filter/dtree/components/modals/components/ui/edit-modal-buttons'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'

export const ModalNumeric = observer((): ReactElement | null => {
  const groups = modalsControlStore.currentStepGroups

  const { attributeStatus, initialCondition, initialNumericValue } =
    dtreeAttributeStore

  if (!attributeStatus || attributeStatus.kind !== 'numeric') {
    return null
  }

  const handleModals = () => {
    modalsVisibilityStore.closeModalNumeric()
    modalsVisibilityStore.openModalAttribute()
  }

  return (
    <ModalBase minHeight={200}>
      <HeaderModal
        groupName={attributeStatus.title ?? attributeStatus.name}
        handleClose={modalsVisibilityStore.closeModalNumeric}
      />
      <NumericCondition
        className="pt-3"
        attrData={attributeStatus}
        initialValue={initialNumericValue}
        controls={({ value, hasErrors }) => {
          const disabled = hasErrors || (value[0] == null && value[2] == null)

          return initialCondition ? (
            <EditModalButtons
              handleClose={modalsVisibilityStore.closeModalNumeric}
              handleSaveChanges={() => {
                changeNumericAttribute(value)
                modalsVisibilityStore.closeModalNumeric()
              }}
              disabled={disabled}
            />
          ) : (
            <SelectModalButtons
              currentGroup={groups}
              handleClose={modalsVisibilityStore.closeModalNumeric}
              handleModals={handleModals}
              handleModalJoin={modalsVisibilityStore.openModalJoin}
              disabled={disabled}
              handleAddAttribute={action => {
                addAttributeToStep(action, 'numeric', value)
                modalsVisibilityStore.closeModalNumeric()
              }}
            />
          )
        }}
      />
    </ModalBase>
  )
})
