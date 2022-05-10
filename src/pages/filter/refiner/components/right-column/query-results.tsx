import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

export const QueryResults = observer((): ReactElement => {
  const { conditions, selectedConditionIndex } = filterStore

  if (!conditions.length) {
    return (
      <div className="flex items-center justify-center border-b border-grey-disabled flex-1">
        <p className="leading-16px text-grey-blue">
          {t('general.noResultsFound')}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-y-auto flex-1">
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
})
