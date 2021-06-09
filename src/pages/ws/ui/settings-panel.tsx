import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { PopperTableModal } from '@ui/popper-table-modal'
import { ColumnsList } from './columns-list'

interface Props {
  close: () => void
}

export const SettingsPanel = observer(
  ({ close }: Props): ReactElement => (
    <PopperTableModal
      title={t('ds.columns')}
      searchInputPlaceholder={t('ds.searchColumn')}
      selectedAmount={datasetStore.columns.length}
      searchValue={datasetStore.searchColumnValue}
      onChange={v => datasetStore.setSearchColumnValue(v)}
      onClearAll={() => datasetStore.clearColumn()}
      onApply={() => {
        datasetStore.showColumns()
        close()
      }}
      onClose={() => {
        datasetStore.cancelColumns()
        close()
      }}
    >
      <ColumnsList />
    </PopperTableModal>
  ),
)
