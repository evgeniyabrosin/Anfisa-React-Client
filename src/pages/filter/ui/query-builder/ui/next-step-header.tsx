import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { RadioButton } from '@ui/radio-button'
import { changeStep } from '@utils/changeStep'
import { ExpandContentButton } from './expand-content-button'
import { ModalOperation } from './modal-operation'
import { StepDivider } from './step-divider'

const Operation = styled.div`
  font-size: 15px;
  font-weight: 400;
`

const Step = styled.div`
  font-size: 17px;
  font-weight: 500;
`

interface IProps {
  isExpanded: boolean
  expandContent: () => void
  index: number
  isIncluded: boolean
}

export const NextStepHeader = observer(
  ({ isExpanded, expandContent, index, isIncluded }: IProps): ReactElement => {
    const [isVisibleModal, showModal, hideModal] = useToggle(false)

    const currentStep = dtreeStore.stepData[index]

    const toggleExclude = (
      stepIndex: number,
      action: 'BOOL-TRUE' | 'BOOL-FALSE',
    ) => {
      dtreeStore.toggleIsExcluded(stepIndex)
      changeStep(stepIndex, action)
      // TODO: change true/false in console
    }

    return (
      <Fragment>
        <div
          style={{ minHeight: 43 }}
          className="flex w-full justify-between items-center mt-1"
        >
          <div className="relative flex items-center">
            <Icon
              name="Options"
              className="cursor-pointer text-blue-bright"
              stroke={false}
              onClick={showModal}
            />

            <Step>
              {t('dtree.step')} {index + 1}
            </Step>

            <div className="absolute">
              {isVisibleModal && (
                <ModalOperation hideModal={hideModal} index={index} />
              )}
            </div>

            {!isExpanded && (
              <div className="ml-2 text-14 text-grey-blue font-normal">
                {`(37,542 variants are ${
                  isIncluded ? 'included' : 'excluded'
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
