import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { theme } from '@theme'
import { IStepData } from '@store/dtree'
import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { FnLabel } from '@components/fn-label'
import activeStepStore, {
  ActiveStepOptions,
} from '@pages/filter/dtree/components/active-step.store'
import modalFiltersStore from '@pages/filter/dtree/components/modals/components/modal-enum/modal-enum.store'
import { EnumPropertyStatusSubKinds } from '@service-providers/common'
import modalsVisibilityStore from '../../../modals/modals-visibility-store'
import { InactiveFieldLabel } from '../inactive-field-label'

const NotModeWrapper = styled.div`
  margin: 8px 4px;
  width: 25px;
  height: 20px;
  color: ${theme('colors.red.light')};
  background-color: ${theme('colors.red.lighter')};
  font-size: 12px;
`

interface IContentItemHeaderProps {
  currentStep: IStepData
  stepType: FilterKindEnum
  groupName: string
  groupSubKind: EnumPropertyStatusSubKinds
  index: number
  currNo: number
}

export const ContentItemHeader = observer(
  ({
    currentStep,
    stepType,
    groupName,
    groupSubKind,
    index,
    currNo,
  }: IContentItemHeaderProps): ReactElement => {
    const isNegateStep: boolean = currentStep.negate || false
    const isStepInvalid: boolean =
      typeof groupName !== 'string' ||
      stepType === FilterKindEnum.Error ||
      !stepType

    const handleModals = () => {
      activeStepStore.makeStepActive(index, ActiveStepOptions.StartedVariants)

      stepType === FilterKindEnum.Enum &&
        modalsVisibilityStore.openModalEnum(groupName, currNo) &&
        modalFiltersStore.setCurrentGroupSubKind(groupSubKind)

      stepType === FilterKindEnum.Numeric &&
        modalsVisibilityStore.openModalNumbers(groupName, currNo)

      if (stepType === FilterKindEnum.Func) {
        groupName === FuncStepTypesEnum.InheritanceMode &&
          modalsVisibilityStore.openModalInheritanceMode(groupName, currNo)

        groupName === FuncStepTypesEnum.CustomInheritanceMode &&
          modalsVisibilityStore.openModalCustomInheritanceMode(
            groupName,
            currNo,
          )

        groupName === FuncStepTypesEnum.CompoundHet &&
          modalsVisibilityStore.openModalCompoundHet(groupName, currNo)

        groupName === FuncStepTypesEnum.CompoundRequest &&
          modalsVisibilityStore.openModalCompoundRequest(groupName, currNo)

        groupName === FuncStepTypesEnum.GeneRegion &&
          modalsVisibilityStore.openModalGeneRegion(groupName, currNo)
      }
    }

    return (
      <div className="flex flex-col w-full h-auto mr-2 pl-2 py-3 rounded-md border border-grey-light step-content-area">
        <div className="flex items-center h-auto w-full pr-2 ">
          <Icon
            name="SettingsFat"
            className="mr-1 cursor-pointer text-blue-bright"
            size={18}
            stroke={false}
            onClick={handleModals}
            dataTestId={DecisionTreesResultsDataCy.gearButton}
          />

          {isNegateStep && (
            <NotModeWrapper className="flex items-center justify-center">
              {'NOT'}
            </NotModeWrapper>
          )}

          <div className="flex items-center text-14 mr-2">
            {stepType === FilterKindEnum.Func && (
              <FnLabel currentStep={currentStep} className="shadow-dark" />
            )}
            {isStepInvalid ? (
              <InactiveFieldLabel stepIndex={index} groupIndex={currNo} />
            ) : (
              groupName
            )}
          </div>

          {/* TODO: add switch to step after implementation in backend */}
          {/* <div className="pt-1.5">
              <Switch isChecked={isChecked} onChange={toggleChecked} />
            </div> */}
        </div>
      </div>
    )
  },
)
