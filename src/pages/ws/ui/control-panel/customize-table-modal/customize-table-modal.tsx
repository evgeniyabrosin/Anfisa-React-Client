import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import columnsStore from '@store/ws/columns'
import variantStore from '@store/ws/variant'
import { PopperTableModal } from '@components/popper-table-modal'
import { ViewTypeTable } from '@components/view-type-table'
import { ColumnsList } from './columns-list/columns-list'
import { ColumnListStore } from './columns-list/columns-list.store'

interface ICustomizeTableModalProps {
  close: () => void
}

export const CustomizeTableModal = observer(
  ({ close }: ICustomizeTableModalProps): ReactElement => {
    const [viewType, setViewType] = useState<ViewTypeEnum>(
      columnsStore.viewType,
    )

    const columnListStore = new ColumnListStore()

    const handleClose = () => {
      columnsStore.resetSearchColumnValue()
      columnsStore.resetColumns()
      close()
    }

    const handleApply = () => {
      columnsStore.filterColumns()
      columnsStore.setViewType(viewType)
      close()
    }

    return (
      <PopperTableModal
        title={t('ds.columns')}
        searchInputPlaceholder={t('ds.searchColumn')}
        selectedAmount={columnListStore.visibleColumnsAmount}
        searchValue={columnsStore.searchColumnValue}
        onChange={v => columnsStore.setSearchColumnValue(v)}
        onSelectAll={() => columnsStore.selectAllColumns()}
        onClearAll={() => columnsStore.clearAllColumns()}
        onApply={handleApply}
        onClose={handleClose}
        setViewType={setViewType}
        viewType={viewType}
        isNotSearchable
        notShowSelectedPanel={variantStore.drawerVisible}
      >
        <>
          {!variantStore.drawerVisible && <ColumnsList />}
          <div
            className={cn('mt-4 mb-5', {
              'border-t-[1px] border-t-blue-light': !variantStore.drawerVisible,
            })}
          >
            <ViewTypeTable setViewType={setViewType} viewType={viewType} />
          </div>
        </>
      </PopperTableModal>
    )
  },
)
