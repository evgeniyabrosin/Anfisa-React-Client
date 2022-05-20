import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { EnumCondition } from '@components/enum-condition/enum-condition'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'

export const ModalEnum = observer((): ReactElement => {
  const groups = modalsControlStore.currentStepGroups

  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
    initialCondition,
  } = dtreeAttributeStore

  return (
    <ModalBase minHeight={200}>
      <HeaderModal
        groupName={attributeName}
        handleClose={modalsVisibilityStore.closeModalEnum}
      />

      <EnumCondition
        attributeName={attributeName}
        enumVariants={enumVariants}
        attributeSubKind={attributeSubKind}
        initialEnumVariants={initialEnumVariants}
        initialEnumMode={initialEnumMode}
        initialCondition={initialCondition}
        currentStepGroups={groups}
        saveEnum={dtreeAttributeStore.saveEnum}
        addEnum={dtreeAttributeStore.addEnum}
      />
    </ModalBase>
  )
})
