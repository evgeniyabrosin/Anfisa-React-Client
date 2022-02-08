import { ReactElement, useState } from 'react'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react-lite'

import { IColumns } from '@declarations'
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

  const [defaultColumns, setDefaultColumns] = useState<IColumns[]>(
    cloneDeep(columnsStore.getExtendedColumns),
  )

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
        columnsStore.showColumns()
        columnsStore.setViewType(viewType)
        setDefaultColumns(columnsStore.getExtendedColumns)
        close()
      }}
      onClose={() => {
        columnsStore.setColumns(defaultColumns)
        columnsStore.resetSearchColumnValue()
        close()
      }}
      setViewType={setViewType}
      viewType={viewType}
    >
      <ColumnsList />
    </PopperTableModal>
  )
})
