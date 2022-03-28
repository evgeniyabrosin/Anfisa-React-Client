import { ReactElement, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { StepTypeEnum } from '@core/enum/step-type-enum'
import { t } from '@i18n'
import { theme } from '@theme'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { FnLabel } from '@components/fn-label'
import activeStepStore, {
  ActiveStepOptions,
} from '@pages/filter/active-step.store'
import { editStepAttribute } from '@utils/editStepAttribute'
import { getNumericExpression } from '@utils/getNumericExpression'
import dtreeModalStore from '../../../modals.store'
import { DropDownJoin } from './dropdown-join'

const ContentControl = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`

const JoinType = styled.div`
  width: 34px;
  height: 28px;
`

const NegateWrapper = styled(JoinType)`
  padding: 2px 6px;
  margin: 2px 4px;
  color: ${theme('colors.red.light')};
  background-color: ${theme('colors.red.lighter')};
`

interface IProps {
  group: any
  index: number
  currNo: number
  expanded: boolean
  setExpandOnClick: () => void
}

export const NextStepContentItem = observer(
  ({
    group,
    index,
    currNo,
    expanded,
    setExpandOnClick,
  }: IProps): ReactElement => {
    // const [isChecked, setIsChecked] = useState(true)

    // const toggleChecked = () => {
    //   setIsChecked(prev => !prev)
    // }
    const [isVisible, setIsVisible] = useState(false)
    const limitSize = 3

    const array = group.find((elem: any) => Array.isArray(elem))

    const getButtonMessage = () => {
      if (group[0] === StepTypeEnum.Numeric) return ''

      const size = array.length - limitSize

      return expanded ? `Hide ${size} variants` : `Show ${size} variants`
    }

    // const toggleVisible = () => {
    //   setIsVisible(prev => !prev)
    // }

    const currentStep = dtreeStore.getStepData[index]

    const handleModals = () => {
      activeStepStore.makeStepActive(index, ActiveStepOptions.StartedVariants)

      group[0] === StepTypeEnum.Enum &&
        dtreeModalStore.openModalFilters(group[1], currNo)

      group[0] === StepTypeEnum.Numeric &&
        dtreeModalStore.openModalNumbers(group[1], currNo)

      if (group[0] === StepTypeEnum.Func) {
        group[1] === FuncStepTypesEnum.InheritanceMode &&
          dtreeModalStore.openModalInheritanceMode(group[1], currNo)

        group[1] === FuncStepTypesEnum.CustomInheritanceMode &&
          dtreeModalStore.openModalCustomInheritanceMode(group[1], currNo)

        group[1] === FuncStepTypesEnum.CompoundHet &&
          dtreeModalStore.openModalCompoundHet(group[1], currNo)

        group[1] === FuncStepTypesEnum.CompoundRequest &&
          dtreeModalStore.openModalCompoundRequest(group[1], currNo)

        group[1] === FuncStepTypesEnum.GeneRegion &&
          dtreeModalStore.openModalGeneRegion(group[1], currNo)
      }
    }

    const currentGroup = currentStep.groups[currNo]
    const isNumeric = currentGroup[0] === 'numeric'

    const isNegateAttribute = currentGroup[2] === 'NOT'
    const isNegateStep = currentStep.negate

    return (
      <div className="flex flex-col h-auto">
        {currNo > 0 && (
          <div
            className={cn(
              'flex w-full h-2/5 py-2 text-14 font-normal items-center relative step-content-area',
              currentStep.isActive ? 'bg-green-light' : 'bg-blue-light',
            )}
            data-testId={DecisionTreeModalDataCy.joinByLabel}
          >
            <div className="mr-1">{t('dtree.joinBy')}</div>
            <JoinType className="flex items-center justify-center bg-orange-light text-orange-bright">
              {group.includes('or') && 'OR'}
              {group.includes('and') && 'AND'}
            </JoinType>

            {/* TODO: this feature has not yet been implemented on the backend  */}
            {/* <ExpandContentButton
              isDropDown
              isVisible={isVisible}
              expandContent={toggleVisible}
            /> */}

            {isVisible && (
              <DropDownJoin
                close={() => setIsVisible(false)}
                index={index}
                currNo={currNo}
              />
            )}
          </div>
        )}

        <ContentControl
          className={cn(
            'w-full h-auto flex rounded-md mr-2 pl-2 py-3 step-content-area',
            currentStep.isActive ? ' bg-green-medium' : 'bg-blue-medium',
          )}
        >
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
              <NegateWrapper className="flex items-center justify-center">
                {'NOT'}
              </NegateWrapper>
            )}

            <div className="flex items-center text-14 font-medium mr-2">
              {group.includes(StepTypeEnum.Func) && (
                <FnLabel currentStep={currentStep} />
              )}
              {`${group[1]}`}
            </div>
            {/* TODO: add switch to step after implementation in backend */}
            {/* <div className="pt-1.5">
              <Switch isChecked={isChecked} onChange={toggleChecked} />
            </div> */}
            {!isNumeric && (
              <label className="pl-4">
                <Checkbox
                  checked={isNegateAttribute}
                  className="mr-1"
                  onChange={() =>
                    editStepAttribute(index, currNo, isNegateAttribute)
                  }
                />
                {t('dtree.negate')}
              </label>
            )}
          </div>

          <div className="flex flex-row step-content-area">
            {isNegateAttribute && (
              <NegateWrapper className="flex items-center justify-center">
                {'NOT'}
              </NegateWrapper>
            )}

            <div className="flex flex-col text-14 font-normal h-full flex-wrap mt-1">
              {group[0] === StepTypeEnum.Numeric &&
                getNumericExpression(array, group[1])}

              {group[0] !== StepTypeEnum.Numeric &&
                array
                  .slice(0, expanded ? Number.MAX_SAFE_INTEGER : limitSize)
                  .map((item: any[]) => <div key={Math.random()}>{item}</div>)}

              {group[0] !== StepTypeEnum.Numeric && array.length > 3 && (
                <div
                  key={Math.random()}
                  className="text-blue-bright cursor-pointer"
                  onClick={setExpandOnClick}
                >
                  {getButtonMessage()}
                </div>
              )}
            </div>
          </div>
        </ContentControl>
      </div>
    )
  },
)
