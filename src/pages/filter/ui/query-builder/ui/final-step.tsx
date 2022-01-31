import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { RadioButton } from '@ui/radio-button'
import { changeStep } from '@utils/changeStep'
import { createEmptyStep } from '@utils/createEmptyStep'
import { makeStepActive } from '@utils/makeStepActive'
import { ResultsView, TreeView } from './next-step'
import { Operation, Step } from './next-step-header'
import { NextStepRoute } from './next-step-route'
import { StepDivider } from './step-divider'

interface IProps {
  index: number
}

export const FinalStep = observer(
  ({ index }: IProps): ReactElement => {
    const currentStep = dtreeStore.getStepData[index]
    const prevStepIndex = index - 1

    const setStepActive = (stepIndex: number, event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        makeStepActive(stepIndex)
      }
    }

    const toggleExclude = (
      stepIndex: number,
      action: 'BOOL-TRUE' | 'BOOL-FALSE',
    ) => {
      dtreeStore.toggleIsExcluded(stepIndex)
      changeStep(stepIndex, action)
    }

    return (
      <div className="flex flex-col mb-2">
        <div className="flex">
          <TreeView
            className={cn(
              'pr-3',
              currentStep.isReturnedVariantsActive ? 'bg-green-light' : '',
            )}
          >
            <NextStepRoute
              isExpanded={true}
              index={index}
              isIncluded={!dtreeStore.getStepData[index].excluded}
            />
          </TreeView>

          <ResultsView
            className={cn(
              'border-l border-grey-light font-medium px-5 relative',
              currentStep.isActive ? ' bg-green-light' : 'bg-blue-light',
            )}
            onClick={event => setStepActive(index, event)}
          >
            <div className="flex w-full  items-center  step-content-area">
              <Step className="mb-2 mt-2">{t('dtree.finalStep')}</Step>

              <div className="flex ml-4">
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
            <StepDivider />
            <div className="text-14 text-grey-blue font-normal step-content-area self-start mt-2 mb-2">
              {t('dtree.initialStep')}
            </div>
            <Button
              text={t('dtree.addStep')}
              className="absolute -bottom-9 z-1000 left-0"
              onClick={() => createEmptyStep(prevStepIndex, 'AFTER')}
            />
          </ResultsView>
        </div>
      </div>
    )
  },
)
