import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { FinalStep } from './ui/final-step'
import { NextStep } from './ui/next-step/next-step'

interface IQueryBuilderTreeViewProps {
  className?: string
}

export const QueryBuilderTreeView = observer(
  ({ className }: IQueryBuilderTreeViewProps): ReactElement => {
    const { filteredStepData } = dtreeStore

    return (
      <div id="parent" className={cn('flex flex-col', className)}>
        {filteredStepData.map((element, index: number) => {
          const key = element.groups
            ? JSON.stringify(element.groups) + index
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
  },
)
