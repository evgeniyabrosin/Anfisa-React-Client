import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { CustomInheritanceModeCondition } from '@components/custom-inheritance-mode-condition/custom-inheritance-mode-condition'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import { dtreeFunctionsStore } from '../../../attributes/dtree-functions.store'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'

export const ModalCustomInheritanceMode = observer((): ReactElement => {
  const {
    attributeName,
    problemGroups,
    initialScenario,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = dtreeFunctionsStore

  const { currentStepGroups } = modalsControlStore

  const handleModals = () => {
    modalsVisibilityStore.closeModalInheritanceMode()
    modalsVisibilityStore.openModalAttribute()
  }

  return (
    <ModalBase minHeight={340}>
      <HeaderModal
        groupName={attributeName}
        handleClose={modalsVisibilityStore.closeModalCustomInheritanceMode}
      />

      <CustomInheritanceModeCondition
        problemGroups={problemGroups}
        initialScenario={initialScenario}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ hasErrors, param, mode }) => {
          return initialCondition ? (
            <EditModalButtons
              handleClose={
                modalsVisibilityStore.closeModalCustomInheritanceMode
              }
              handleSaveChanges={() => {
                saveAttribute({
                  filterKind: FilterKindEnum.Func,
                  filterName: FuncStepTypesEnum.CustomInheritanceMode,
                  values: ['True'],
                  mode,
                  param,
                })
                modalsVisibilityStore.closeModalCustomInheritanceMode()
              }}
              disabled={hasErrors}
            />
          ) : (
            <SelectModalButtons
              currentGroup={currentStepGroups}
              handleClose={
                modalsVisibilityStore.closeModalCustomInheritanceMode
              }
              handleModals={handleModals}
              handleModalJoin={modalsVisibilityStore.openModalJoin}
              disabled={hasErrors}
              handleAddAttribute={action => {
                addAttributeToStep(
                  action,
                  AttributeKinds.FUNC,
                  ['True'],
                  param,
                  mode,
                )
                modalsVisibilityStore.closeModalCustomInheritanceMode()
              }}
            />
          )
        }}
      />
    </ModalBase>
  )
})
