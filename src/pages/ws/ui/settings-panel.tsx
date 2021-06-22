import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { PopperTableModal } from '@ui/popper-table-modal'
import { ColumnsList } from './columns-list'

interface Props {
  close: () => void
}

export const SettingsPanel = observer(
  ({ close }: Props): ReactElement => {
    const [viewType, setViewType] = useState<ViewTypeEnum>(
      datasetStore.viewType,
    )

    return (
      <PopperTableModal
        title={t('ds.columns')}
        searchInputPlaceholder={t('ds.searchColumn')}
        selectedAmount={datasetStore.columns.length}
        searchValue={datasetStore.searchColumnValue}
        onChange={v => datasetStore.setSearchColumnValue(v)}
        onClearAll={() => datasetStore.clearColumn()}
        onApply={() => {
          datasetStore.showColumns()
          datasetStore.setViewType(viewType)
          close()
        }}
        onClose={() => {
          datasetStore.cancelColumns()
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
