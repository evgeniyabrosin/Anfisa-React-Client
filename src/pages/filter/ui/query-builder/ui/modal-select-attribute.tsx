import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useFilterQueryBuilder } from '@core/hooks/use-filter-query-builder'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { QueryBuilderSearch } from '../query-builder-search'
import { QueryBuilderSubgroup } from '../query-builder-subgroup'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'

export const ModalSelectAttribute = observer(
  (): ReactElement => {
    const {
      filterValue,
      setFilterValue,
      filteredQueryBuilder,
    } = useFilterQueryBuilder()

    const groupNames = Object.keys(filteredQueryBuilder)

    const subGroupData = Object.values(filteredQueryBuilder)

    const ref = useRef(null)

    const handleClose = () => {
      dtreeStore.closeModalAttribute()
      dtreeStore.resetFilterModalValue()
    }

    return (
      <ModalBase refer={ref} minHeight={340}>
        <HeaderModal
          groupName={t('dtree.selectAttribute')}
          handleClose={handleClose}
        />

        <div className="flex w-full mt-4">
          <QueryBuilderSearch
            value={filterValue}
            onChange={(value: string) => setFilterValue(value)}
            isModal
          />
        </div>

        <div className="flex-1 overflow-y-scroll mt-4">
          {dtreeStore.isFiltersLoading ? (
            <div className="flex justify-center w-full my-4">
              {t('dtree.loading')}
            </div>
          ) : (
            groupNames.map((groupName, index) => (
              <QueryBuilderSubgroup
                groupName={groupName}
                subGroupData={subGroupData[index]}
                key={groupName}
                changeIndicator={dtreeStore.filterModalChangeIndicator}
                isContentExpanded={dtreeStore.isFilterModalContentExpanded}
                isModal
              />
            ))
          )}
        </div>
      </ModalBase>
    )
  },
)
