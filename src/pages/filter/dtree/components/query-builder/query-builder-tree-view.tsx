import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { FinalStep } from './ui/final-step'
import { NextStep } from './ui/next-step/next-step'

interface IQueryBuilderTreeViewProps {
  className?: string
}

export const QueryBuilderTreeView = observer(
  ({ className }: IQueryBuilderTreeViewProps): ReactElement => {
    const { filteredSteps } = stepStore

    return (
      <div id="parent" className={cn('flex flex-col', className)}>
        {filteredSteps.map((element, index: number) => {
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
