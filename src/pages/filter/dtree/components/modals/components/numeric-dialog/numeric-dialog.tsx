import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { NumericCondition } from '@components/numeric-condition'
import { EditModalButtons } from '@pages/filter/dtree/components/modals/components/ui/edit-modal-buttons'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { SelectModalButtons } from '../ui/select-modal-buttons'

export const NumericDialog = observer((): ReactElement | null => {
  const {
    attributeStatus,
    initialCondition,
    initialNumericValue,
    attributeName,
    currentStepGroups,
  } = dtreeAttributeStore

  if (!attributeStatus || attributeStatus.kind !== 'numeric') {
    return null
  }

  const handleModals = () => {
    modalsVisibilityStore.closeNumericDialog()
    modalsVisibilityStore.openModalAttribute()
  }

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isNumericDialogVisible}
      onClose={modalsVisibilityStore.closeNumericDialog}
      title={attributeName}
      width="m"
      actions={''}
    >
      <NumericCondition
        className="pt-3"
        attrData={attributeStatus}
        initialValue={initialNumericValue}
        controls={({ value, hasErrors }) => {
          const disabled =
            hasErrors ||
            (value[0] == null && value[2] == null) ||
            (typeof attributeStatus.min !== 'number' &&
              typeof attributeStatus.max !== 'number')

          return initialCondition ? (
            <EditModalButtons
              handleClose={modalsVisibilityStore.closeNumericDialog}
              handleSaveChanges={() => {
                changeNumericAttribute(value)
                modalsVisibilityStore.closeNumericDialog()
              }}
              disabled={disabled}
            />
          ) : (
            <SelectModalButtons
              currentGroup={currentStepGroups}
              handleClose={modalsVisibilityStore.closeNumericDialog}
              handleModals={handleModals}
              disabled={disabled}
              handleAddAttribute={action => {
                addAttributeToStep(action, 'numeric', value)
                modalsVisibilityStore.closeNumericDialog()
              }}
            />
          )
        }}
      />
    </Dialog>
  )
})
