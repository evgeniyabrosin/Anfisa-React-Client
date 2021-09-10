import { Fragment, ReactElement, useState } from 'react'
import cn from 'classnames'
// import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
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

type Props = {
  index: number
  length: number
}

export const NextStep = observer(
  ({ index, length }: Props): ReactElement => {
    const [isExpanded, setIsExpanded] = useState(true)

    const expandContent = () => {
      setIsExpanded(prev => !prev)
    }

    const currentStep = dtreeStore.stepData[index]

    return (
      <Fragment>
        <div className="flex flex-col mb-2">
          <div className="flex">
            <TreeView className="justify-end items-start pr-3">
              <NextStepRoute
                isExpanded={isExpanded}
                index={index}
                length={length}
                isIncluded={!dtreeStore.stepData[index].excluded}
              />
            </TreeView>

            <ResultsView
              className={cn(
                'border-l border-grey-light font-medium px-5 relative',
                currentStep.isActive ? ' bg-green-light' : 'bg-blue-light',
              )}
            >
              <NextStepHeader
                isExpanded={isExpanded}
                expandContent={expandContent}
                index={index}
                isIncluded={dtreeStore.stepData[index].excluded}
              />

              {isExpanded && <NextStepContent index={index} />}

              {length - index < 2 && (
                <Button
                  disabled={!dtreeStore.stepData[index].groups}
                  text="+ Add Step"
                  className="absolute -bottom-9 z-1000 left-0"
                  onClick={() => dtreeStore.addStep(index)}
                />
              )}
            </ResultsView>
          </div>
        </div>
      </Fragment>
    )
  },
)
