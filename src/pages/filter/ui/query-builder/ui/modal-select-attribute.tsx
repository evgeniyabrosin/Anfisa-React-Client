import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { QueryBuilderSearch } from '../query-builder-search'
import { QueryBuilderSubgroup } from '../query-builder-subgroup'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'

export const ModalSelectAttribute = observer(
  (): ReactElement => {
    const groupNames = Object.keys(dtreeStore.getModalQueryBuilder)

    const subGroupData = Object.values(dtreeStore.getModalQueryBuilder)

    const ref = useRef(null)

    const handleClose = () => {
      dtreeStore.closeModalAttribute()
      dtreeStore.resetFilterModalValue()
    }

    return (
      <ModalBase refer={ref} minHeight={340}>
        <HeaderModal
          groupName={t('dtree.selectAnAttribute')}
          handleClose={handleClose}
        />

        <div className="flex w-full mt-4">
          <QueryBuilderSearch
            value={dtreeStore.filterModalValue}
            onChange={(e: string) => dtreeStore.setFilterModalValue(e)}
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
