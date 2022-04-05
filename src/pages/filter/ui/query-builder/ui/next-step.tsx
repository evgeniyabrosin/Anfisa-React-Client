import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import dtreeStore from '@store/dtree'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import activeStepStore, {
  ActiveStepOptions,
} from '@pages/filter/active-step.store'
import { NextStepContent } from './next-step-content'
import { NextStepHeader } from './next-step-header'
import { NextStepRoute } from './next-step-route'

export const TreeView = styled.div`
  width: 13%;
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

    const currentStep = dtreeStore.getStepData[index]

    const setStepActive = (stepIndex: number, event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        activeStepStore.makeStepActive(
          stepIndex,
          ActiveStepOptions.StartedVariants,
        )
      }
    }

    return (
      <div
        className="flex flex-col"
        data-testid={DecisionTreesResultsDataCy.stepCard}
      >
        <div className="flex overflow-hidden">
          <TreeView
            className={cn(
              'pr-3',
              currentStep.isReturnedVariantsActive ? ' bg-blue-tertiary' : '',
            )}
          >
            <NextStepRoute
              isExpanded={isExpanded}
              index={index}
              isIncluded={!dtreeStore.getStepData[index].excluded}
            />
          </TreeView>

          <ResultsView
            className={cn(
              'border-b border-l border-grey-light font-medium px-5 relative',
              currentStep.isActive && ' bg-blue-tertiary',
            )}
            onClick={event => setStepActive(index, event)}
          >
            <NextStepHeader
              isExpanded={isExpanded}
              expandContent={expandContent}
              index={index}
              isExcluded={dtreeStore.getStepData[index].excluded}
            />

            {isExpanded && <NextStepContent index={index} />}
          </ResultsView>
        </div>
      </div>
    )
  },
)
