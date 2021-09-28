import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { NextStep } from './ui/next-step'

export const QueryBuilderTreeView = observer(
  (): ReactElement => {
    const poitnCounts = dtreeStore.pointCounts

    useEffect(() => {
      dtreeStore.updatePointCounts(poitnCounts)
    }, [poitnCounts])

    return (
      <div id="parent" className="flex flex-col overflow-auto h-full">
        {dtreeStore.stepData.map((element, index: number) => {
          const key = element.groups
            ? JSON.stringify(element.groups) +
              element.finishFilterCounts +
              index
            : index

          return (
            <NextStep
              key={key}
              index={index}
              length={dtreeStore.stepData.length}
            />
          )
        })}
      </div>
    )
  },
)
