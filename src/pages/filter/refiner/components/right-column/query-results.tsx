import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

interface IQueryResultsProps {
  className?: string
}

export const QueryResults = observer(
  ({ className }: IQueryResultsProps): ReactElement => {
    const { conditions, selectedConditionIndex } = filterStore

    if (conditions.length === 0) {
      return (
        <div className={cn('flex items-center justify-center', className)}>
          <p className="leading-16px text-grey-blue">
            {t('general.noResultsFound')}
          </p>
        </div>
      )
    }

    return (
      <div className={cn('overflow-y-auto', className)}>
        {conditions.map((condition, index) => (
          <div key={`${condition[1]}_${index}`} className="flex flex-col">
            <SelectedFilterCard
              isActive={index === selectedConditionIndex}
              index={index}
            />
          </div>
        ))}
      </div>
    )
  },
)
