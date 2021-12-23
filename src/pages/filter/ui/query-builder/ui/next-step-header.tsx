import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { RadioButton } from '@ui/radio-button'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { changeStep } from '@utils/changeStep'
import { ExpandContentButton } from './expand-content-button'
import { ModalOperation } from './modal-operation'
import { getNumberWithCommas } from './next-step-route'
import { StepDivider } from './step-divider'

export const Operation = styled.div`
  font-size: 15px;
  font-weight: 400;
`

export const Step = styled.div`
  font-size: 17px;
  font-weight: 500;
`

interface IProps {
  isExpanded: boolean
  expandContent: () => void
  index: number
  isExcluded: boolean
}

export const NextStepHeader = observer(
  ({ isExpanded, expandContent, index, isExcluded }: IProps): ReactElement => {
    const [isVisibleModal, showModal, hideModal] = useToggle(false)

    const currentStep = dtreeStore.getStepData[index]

    const difference = dtreeStore.getStepData[index].difference

    const toggleExclude = (
      stepIndex: number,
      action: 'BOOL-TRUE' | 'BOOL-FALSE',
    ) => {
      dtreeStore.toggleIsExcluded(stepIndex)
      changeStep(stepIndex, action)
    }

    const isEmptyStep = currentStep.groups.length === 0
    const isFirstStep = index === 0
    const isEmptyFirstStep = isEmptyStep && isFirstStep

    return (
      <Fragment>
        <div
          style={{ minHeight: 43 }}
          className="flex w-full justify-between items-center mt-1 step-content-area"
        >
          <div className="relative flex items-center">
            {!isEmptyFirstStep && (
              <Icon
                dataTestId={DecisionTreesResultsDataCy.optionsMenu}
                name="Options"
                className="cursor-pointer text-blue-bright"
                stroke={false}
                onClick={showModal}
              />
            )}

            <Step>
              {t('dtree.step')}{' '}
              {dtreeStore.algorithmFilterValue
                ? dtreeStore.getStepData[index].step
                : index + 1}
            </Step>

            <div className="absolute">
              {isVisibleModal && (
                <ModalOperation hideModal={hideModal} index={index} />
              )}
            </div>

            {!isExpanded && (difference || difference === 0) && (
              <div className="ml-2 text-14 text-grey-blue font-normal">
                {`(${getNumberWithCommas(difference)} variants are ${
                  isExcluded ? 'excluded' : 'included'
                })`}
              </div>
            )}

            <div
              className={cn('flex ml-4', {
                hidden: !currentStep.groups || currentStep.groups.length === 0,
              })}
            >
              <div className="flex items-center mr-3">
                <RadioButton
                  isChecked={!currentStep.excluded}
                  onChange={() => toggleExclude(index, 'BOOL-TRUE')}
                />

                <Operation className="ml-1">{t('dtree.include')}</Operation>
              </div>

              <div className="flex items-center">
                <RadioButton
                  isChecked={currentStep.excluded}
                  onChange={() => toggleExclude(index, 'BOOL-FALSE')}
                />

                <Operation className="ml-1 ">{t('dtree.exclude')}</Operation>
              </div>
            </div>
          </div>

          <div className="flex">
            <ExpandContentButton
              isVisible={isExpanded}
              isStep
              expandContent={expandContent}
            />
          </div>
        </div>
        {isExpanded && <StepDivider />}
      </Fragment>
    )
  },
)
