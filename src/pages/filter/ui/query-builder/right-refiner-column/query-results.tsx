import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

export const QueryResults = observer((): ReactElement => {
  const selectedFilters = filterStore.selectedFiltersArray

  if (selectedFilters.length === 0) {
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
      {selectedFilters.map(([filterId, filterCondition]) => (
        <div key={filterId} className="flex flex-col">
          <SelectedFilterCard
            filterId={filterId}
            filterCondition={filterCondition}
          />
        </div>
      ))}
    </div>
  )
})
