import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { QueryBuilderSearch } from '../query-builder-search'
import { QueryBuilderSubgroup } from '../query-builder-subgroup'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'

export const ModalSelectAttribute = observer(
  (): ReactElement => {
    const groupNames = Object.keys(dtreeStore.getQueryBuilder)
    const subGroupData = Object.values(dtreeStore.getQueryBuilder)

    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalAttribute())

    const handleClose = () => {
      dtreeStore.closeModalAttribute()
    }

    return (
      <ModalBase refer={ref} minHeight={340}>
        <HeaderModal
          groupName={t('dtree.selectAnAttribute')}
          handleClose={handleClose}
        />

        <div className="flex w-full mt-4">
          <QueryBuilderSearch
            value={dtreeStore.searchFieldFilterList}
            onChange={dtreeStore.addSearchFieldFilterList}
            isModal
          />
        </div>

        <div className="flex-1 overflow-y-scroll mt-4">
          {groupNames.map((groupName, index) => (
            <QueryBuilderSubgroup
              groupName={groupName}
              subGroupData={subGroupData[index]}
              key={groupName}
              changeIndicator={dtreeStore.filterChangeIndicator}
              isContentExpanded={dtreeStore.isFilterContentExpanded}
              isModal
            />
          ))}
        </div>
      </ModalBase>
    )
  },
)
