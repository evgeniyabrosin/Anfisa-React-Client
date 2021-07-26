import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import columnsStore from '@store/wsColumns'
import { PopperTableModal } from '@components/popper-table-modal'
import { ColumnsList } from './columns-list'

interface Props {
  close: () => void
}

export const SettingsPanel = observer(
  ({ close }: Props): ReactElement => {
    const [viewType, setViewType] = useState<ViewTypeEnum>(
      columnsStore.viewType,
    )

    return (
      <PopperTableModal
        title={t('ds.columns')}
        searchInputPlaceholder={t('ds.searchColumn')}
        selectedAmount={columnsStore.columns.length}
        searchValue={columnsStore.searchColumnValue}
        onChange={v => columnsStore.setSearchColumnValue(v)}
        onSelectAll={() => columnsStore.setAllColumn()}
        onClearAll={() => columnsStore.clearColumn()}
        onApply={() => {
          columnsStore.showColumns()
          columnsStore.setViewType(viewType)
          close()
        }}
        onClose={() => {
          columnsStore.cancelColumns()
          close()
        }}
        setViewType={setViewType}
        viewType={viewType}
      >
        <ColumnsList />
      </PopperTableModal>
    )
  },
)
