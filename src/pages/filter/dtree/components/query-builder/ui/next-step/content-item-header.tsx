import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { theme } from '@theme'
import { IStepData } from '@store/dtree/dtree.store'
import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { FnLabel } from '@components/fn-label'
import activeStepStore, {
  ActiveStepOptions,
} from '@pages/filter/dtree/components/active-step.store'
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
  stepNo: number
  groupNo: number
}

export const ContentItemHeader = observer(
  ({
    currentStep,
    stepType,
    groupName,
    stepNo,
    groupNo,
  }: IContentItemHeaderProps): ReactElement => {
    const isNegateStep: boolean = currentStep.isNegate || false
    const isStepInvalid: boolean =
      typeof groupName !== 'string' ||
      stepType === FilterKindEnum.Error ||
      !stepType

    const handleModals = () => {
      activeStepStore.makeStepActive(
        stepNo - 1,
        ActiveStepOptions.StartedVariants,
      )

      stepType === FilterKindEnum.Enum &&
        modalsVisibilityStore.openModalEnum(groupName, groupNo)

      stepType === FilterKindEnum.Numeric &&
        modalsVisibilityStore.openModalNumeric(groupName, groupNo)

      if (stepType === FilterKindEnum.Func) {
        groupName === FuncStepTypesEnum.InheritanceMode &&
          modalsVisibilityStore.openModalInheritanceMode(groupName, groupNo)

        groupName === FuncStepTypesEnum.CustomInheritanceMode &&
          modalsVisibilityStore.openModalCustomInheritanceMode(
            groupName,
            groupNo,
          )

        groupName === FuncStepTypesEnum.CompoundHet &&
          modalsVisibilityStore.openModalCompoundHet(groupName, groupNo)

        groupName === FuncStepTypesEnum.CompoundRequest &&
          modalsVisibilityStore.openModalCompoundRequest(groupName, groupNo)

        groupName === FuncStepTypesEnum.GeneRegion &&
          modalsVisibilityStore.openModalGeneRegion(groupName, groupNo)
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
              <FnLabel
                isActive={currentStep && currentStep.isActive}
                className="shadow-dark"
              />
            )}
            {isStepInvalid ? (
              <InactiveFieldLabel stepNo={stepNo} groupIndex={groupNo} />
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
