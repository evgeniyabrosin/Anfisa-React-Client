import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { makeStepActive } from '@utils/makeStepActive'
import { NextStepContent } from './next-step-content'
import { NextStepHeader } from './next-step-header'
import { NextStepRoute } from './next-step-route'

const TreeView = styled.div`
  width: 13%;
  display: flex;
  height: 117%;
`

const ResultsView = styled.div`
  width: 87%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface IProps {
  index: number
  length: number
  isContentExpanded: boolean
  changeIndicator: number
}

export const NextStep = observer(
  ({
    index,
    length,
    isContentExpanded,
    changeIndicator,
  }: IProps): ReactElement => {
    const [isExpanded, setIsExpanded] = useState(true)

    useEffect(() => {
      !isContentExpanded && setIsExpanded(true)
      isContentExpanded && setIsExpanded(false)
    }, [isContentExpanded, changeIndicator])

    const expandContent = () => {
      setIsExpanded(prev => !prev)
    }

    const currentStep = dtreeStore.getStepData[index]
    const code = dtreeStore.dtreeCode

    const createStep = (stepIndex: number) => {
      dtreeStore.addStep(stepIndex)
      const indexForApi = dtreeStore.getLastStepIndexForApi()

      dtreeStore.setCurrentStepIndexForApi(indexForApi)
      dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
    }

    const setStepActive = (stepIndex: number, event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        makeStepActive(stepIndex)
      }
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
              isExpanded={isExpanded}
              index={index}
              length={length}
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
            <NextStepHeader
              isExpanded={isExpanded}
              expandContent={expandContent}
              index={index}
              isExcluded={dtreeStore.getStepData[index].excluded}
            />

            {isExpanded && <NextStepContent index={index} />}

            {length - index < 2 && (
              <Button
                disabled={!dtreeStore.getStepData[index].groups}
                text={t('dtree.addStep')}
                className="absolute -bottom-9 z-1000 left-0"
                onClick={() => createStep(index)}
              />
            )}
          </ResultsView>
        </div>
      </div>
    )
  },
)
