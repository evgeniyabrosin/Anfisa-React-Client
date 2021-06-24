import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { tableColumnMap } from '@core/table-column-map'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore from '@store/filterZone'
import { PopperButton } from '@ui/popper-button'
import { PopperTableModal } from '@ui/popper-table-modal'
import { Tags } from '@ui/tags'
import { HeaderTableButton } from './header-table-button'

const ButtonElement = ({ refEl, onClick }: any) => (
  <HeaderTableButton
    text={tableColumnMap.tags}
    refEl={refEl}
    onClick={onClick}
  />
)

const ModalElement = observer(({ close }: { close: () => void }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleApply = () => {
    zoneStore.fetchTagSelectAsync()

    close()
  }

  return (
    <PopperTableModal
      title={t('general.tags')}
      selectedAmount={zoneStore.selectedTags.length}
      searchInputPlaceholder={t('ds.searchTag')}
      onClose={close}
      onClearAll={zoneStore.unselectAllTags}
      searchValue={searchValue}
      onApply={handleApply}
      onChange={setSearchValue}
    >
      <Tags
        tags={datasetStore.tags.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
        className="flex-wrap max-w-xs"
      />
    </PopperTableModal>
  )
})

export const TagsHeaderTable = () => (
  <PopperButton ButtonElement={ButtonElement} ModalElement={ModalElement} />
)
