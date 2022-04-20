import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

export const QueryResults = observer((): ReactElement => {
  const { conditions, selectedConditionIndex } = filterStore

  if (conditions.length === 0) {
    return (
      <div
        style={{ height: 'calc(100vh - 276px)' }}
        className="flex items-center justify-center border-b border-grey-disabled"
      >
        <p className="leading-16px text-grey-blue">
          {t('general.noResultsFound')}
        </p>
      </div>
    )
  }

  return (
    <div
      className="overflow-y-scroll"
      style={{ height: 'calc(100vh - 320px)' }}
    >
      {conditions.map((condition, index) => (
        <div key={`${condition[1]}_${index}`} className="flex flex-col">
          <SelectedFilterCard
            isActive={index === selectedConditionIndex}
            condition={condition}
            onSelect={() => filterStore.selectCondition(index)}
            onDelete={() => filterStore.removeCondition(index)}
          />
        </div>
      ))}
    </div>
  )
})
