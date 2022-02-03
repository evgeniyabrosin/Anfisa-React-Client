import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { FinalStep } from './ui/final-step'
import { NextStep } from './ui/next-step'

export const QueryBuilderTreeView = observer((): ReactElement => {
  const poitnCounts = dtreeStore.pointCounts

  const stepData = dtreeStore.getStepData

  useEffect(() => {
    dtreeStore.updatePointCounts(poitnCounts)
    dtreeStore.setAcceptedVariants()
  }, [poitnCounts])

  return (
    <div id="parent" className="flex flex-col overflow-auto h-full">
      {stepData.map((element, index: number) => {
        const key = element.groups
          ? JSON.stringify(element.groups) + element.finishFilterCounts + index
          : index

        return element.isFinalStep ? (
          <FinalStep key={key} index={index} />
        ) : (
          <NextStep
            key={key}
            index={index}
            changeIndicator={dtreeStore.resultsChangeIndicator}
            isContentExpanded={dtreeStore.isResultsContentExpanded}
          />
        )
      })}
    </div>
  )
})
