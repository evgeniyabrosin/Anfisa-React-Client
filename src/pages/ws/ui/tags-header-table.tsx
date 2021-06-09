import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { tableColumnMap } from '@core/table-column-map'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { FilterSvg } from '@icons/filter'
import { PopperButton } from '@ui/popper-button'
import { PopperTableModal } from '@ui/popper-table-modal'
import { Tags } from '@ui/tags'

const ButtonElement = ({ refEl, onClick }: any) => (
  <div
    ref={refEl}
    onClick={onClick}
    className="flex item-center justify-between"
  >
    <p>{tableColumnMap.tags}</p>

    <FilterSvg />
  </div>
)

const ModalElement = observer(({ close }: { close: () => void }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleApply = () => {
    datasetStore.fetchTagSelectAsync()

    close()
  }

  return (
    <PopperTableModal
      title={t('general.tags')}
      selectedAmount={datasetStore.selectedTags.length}
      onClose={close}
      onClearAll={datasetStore.unselectAllTags}
      searchValue={searchValue}
      onApply={handleApply}
      onChange={setSearchValue}
    >
      <Tags
        tags={datasetStore.tags.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
      />
    </PopperTableModal>
  )
})

export const TagsHeaderTable = () => (
  <PopperButton ButtonElement={ButtonElement} ModalElement={ModalElement} />
)
