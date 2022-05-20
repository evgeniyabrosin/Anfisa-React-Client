import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { EditModalButtons } from '@pages/filter/dtree/components/modals/components/ui/edit-modal-buttons'
import { SelectModalButtons } from '@pages/filter/dtree/components/modals/components/ui/select-modal-buttons'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { TCondition } from '@service-providers/common'

interface IDtreeAttributeButtonsProps {
  initialCondition: TCondition | undefined
  handleSave: () => void
  selectedVariants: string[]
  handleAddAttribute: (action: ActionType) => void
  currentStepGroups: string[] | undefined
}

export const DtreeAttributeButtons = observer(
  ({
    initialCondition,
    handleSave,
    selectedVariants,
    handleAddAttribute,
    currentStepGroups,
  }: IDtreeAttributeButtonsProps): ReactElement => {
    const handleOpenModalAttribute = () => {
      modalsVisibilityStore.closeModalEnum()
      modalsVisibilityStore.openModalAttribute()
    }
    return (
      <>
        {initialCondition ? (
          <EditModalButtons
            handleClose={modalsVisibilityStore.closeModalEnum}
            handleSaveChanges={handleSave}
            disabled={selectedVariants.length === 0}
          />
        ) : (
          <SelectModalButtons
            handleClose={modalsVisibilityStore.closeModalEnum}
            handleModals={handleOpenModalAttribute}
            handleModalJoin={modalsVisibilityStore.openModalJoin}
            disabled={selectedVariants.length === 0}
            currentGroup={currentStepGroups}
            handleAddAttribute={handleAddAttribute}
          />
        )}
      </>
    )
  },
)
