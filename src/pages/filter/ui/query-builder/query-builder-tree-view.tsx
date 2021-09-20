import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { NextStep } from './ui/next-step'

export const QueryBuilderTreeView = observer(
  (): ReactElement => {
    return (
      <div id="parent" className="flex flex-col overflow-auto h-full">
        {dtreeStore.stepData.map((element, index: number) => {
          const key = element.groups
            ? JSON.stringify(element.groups) + element.finishFilterCounts
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
