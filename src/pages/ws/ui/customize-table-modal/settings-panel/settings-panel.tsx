import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import columnsStore from '@store/wsColumns'
import { PopperTableModal } from '@components/popper-table-modal'
import { ColumnsList } from '../columns-list/columns-list'
import { ColumnListStore } from '../columns-list/columns-list.store'

interface Props {
  close: () => void
}

export const SettingsPanel = observer(({ close }: Props): ReactElement => {
  const [viewType, setViewType] = useState<ViewTypeEnum>(columnsStore.viewType)

  const columnListStore = new ColumnListStore()

  return (
    <PopperTableModal
      title={t('ds.columns')}
      searchInputPlaceholder={t('ds.searchColumn')}
      selectedAmount={columnListStore.visibleColumnsAmount}
      searchValue={columnsStore.searchColumnValue}
      onChange={v => columnsStore.setSearchColumnValue(v)}
      onSelectAll={() => columnsStore.selectAllColumns()}
      onClearAll={() => columnsStore.clearAllColumns()}
      onApply={() => {
        columnsStore.filterColumns()
        columnsStore.setViewType(viewType)
        close()
      }}
      onClose={() => {
        columnsStore.resetSearchColumnValue()
        columnsStore.resetColumns()
        close()
      }}
      setViewType={setViewType}
      viewType={viewType}
    >
      <ColumnsList />
    </PopperTableModal>
  )
})
