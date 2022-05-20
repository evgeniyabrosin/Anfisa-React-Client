import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
import { useScrollPosition } from '@core/hooks/use-scroll-position'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { UnitsList } from '@components/units-list'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { AttributeKinds, TPropertyStatus } from '@service-providers/common'

interface IDtreeUnitsList {
  className?: string
  listContainerId?: string
  isModal: boolean
}

const DtreeUnitsListSubHeader = observer(() => {
  const activeStepIndex = dtreeStore.stepData.findIndex(
    step => step.isActive || step.isReturnedVariantsActive,
  )

  const activeStep = dtreeStore.stepData[activeStepIndex]

  const returnedVariantsPrompt = activeStep?.excluded
    ? ` (${t('dtree.excludedVariants')})`
    : ` (${t('dtree.includedVariants')})`

  const shouldShowVariantsPrompt = Boolean(
    activeStep?.isReturnedVariantsActive || activeStep?.isFinalStep,
  )

  return (
    <div className="text-blue-bright font-medium">
      {activeStep &&
        (activeStep.isFinalStep
          ? t('dtree.showingResultsForFinalStep')
          : t('dtree.showingResultsForStep') + ' ' + activeStep.step)}

      {shouldShowVariantsPrompt && returnedVariantsPrompt}
    </div>
  )
})

export const DtreeUnitsList = observer(
  ({ className, isModal, listContainerId }: IDtreeUnitsList): ReactElement => {
    const { unitGroups, functionalUnits } = dtreeStore.stat

    const [, writeScrollPosition] = useScrollPosition({
      elem: '#attributes-container',
      storageId: 'attributesModalScrollPos',
    })

    const handleUnitSelect = (attribute: TPropertyStatus) => {
      const { kind, name, vgroup } = attribute
      const source = isModal ? ModalSources.TreeStep : ModalSources.TreeStat

      if (isModal) {
        writeScrollPosition()
      }
      dtreeStore.addSelectedGroup([vgroup, name])
      modalsVisibilityStore.closeModalAttribute()

      if (kind === AttributeKinds.ENUM) {
        modalsVisibilityStore.openModalEnum(name, undefined, source)
      } else if (kind === AttributeKinds.NUMERIC) {
        modalsVisibilityStore.openModalNumeric(name, undefined, source)
      } else if (kind === AttributeKinds.FUNC) {
        switch (name as FuncStepTypesEnum) {
          case FuncStepTypesEnum.InheritanceMode:
            modalsVisibilityStore.openModalInheritanceMode(
              name,
              undefined,
              source,
            )
            break
          case FuncStepTypesEnum.CustomInheritanceMode:
            modalsVisibilityStore.openModalCustomInheritanceMode(
              name,
              undefined,
              source,
            )
            break
          case FuncStepTypesEnum.CompoundHet:
            modalsVisibilityStore.openModalCompoundHet(name, undefined, source)
            break
          case FuncStepTypesEnum.CompoundRequest:
            modalsVisibilityStore.openModalCompoundRequest(
              name,
              undefined,
              source,
            )

            break
          case FuncStepTypesEnum.GeneRegion:
            modalsVisibilityStore.openModalGeneRegion(name, undefined, source)
            break
        }
      }
    }

    return (
      <UnitsList
        className={className}
        isDark={!isModal}
        withCharts={!isModal}
        subHeader={!isModal && <DtreeUnitsListSubHeader />}
        groups={unitGroups}
        functionalUnits={functionalUnits}
        onSelect={handleUnitSelect}
        listContainerId={listContainerId}
      />
    )
  },
)
