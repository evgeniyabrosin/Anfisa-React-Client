import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { NextStepContent } from './next-step-content'
import { NextStepHeader } from './next-step-header'
import { NextStepRoute } from './next-step-route'

export const TreeView = styled.div`
  width: 13%;
  min-width: 132px;
  display: flex;
  height: 117%;
`

export const ResultsView = styled.div`
  width: 87%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface INextStepProps {
  index: number
  isContentExpanded: boolean
  changeIndicator: number
}

export const NextStep = observer(
  ({
    index,
    isContentExpanded,
    changeIndicator,
  }: INextStepProps): ReactElement => {
    const [isExpanded, setIsExpanded] = useState(true)

    useEffect(() => {
      !isContentExpanded && setIsExpanded(true)
      isContentExpanded && setIsExpanded(false)
    }, [isContentExpanded, changeIndicator])

    const expandContent = () => {
      setIsExpanded(prev => !prev)
    }

    const currentStep = stepStore.filteredSteps[index]
    const stepNo = currentStep.step

    const setStepActive = (event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        stepStore.makeStepActive(stepNo - 1, ActiveStepOptions.StartedVariants)
      }
    }

    return (
      <div
        className="flex flex-col"
        data-testid={DecisionTreesResultsDataCy.stepCard}
      >
        <div className="flex">
          <TreeView
            className={cn(
              'pr-3',
              currentStep.isReturnedVariantsActive ? ' bg-blue-tertiary' : '',
            )}
          >
            <NextStepRoute
              isExpanded={isExpanded}
              index={index}
              stepNo={stepNo}
              isIncluded={!currentStep.excluded}
            />
          </TreeView>

          <ResultsView
            className={cn(
              'border-b border-l border-grey-light font-medium px-5 relative',
              currentStep.isActive && ' bg-blue-tertiary',
            )}
            onClick={event => setStepActive(event)}
          >
            <NextStepHeader
              isExpanded={isExpanded}
              expandContent={expandContent}
              index={index}
              isExcluded={currentStep.excluded}
            />

            {isExpanded && <NextStepContent index={index} stepNo={stepNo} />}
          </ResultsView>
        </div>
      </div>
    )
  },
)
