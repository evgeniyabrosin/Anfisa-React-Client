import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import zoneStore from '@store/ws/zone'
import { PopperTableModal } from '@components/popper-table-modal'
import { ZoneModalList } from './components/zone-modal-list'

interface ITagsModalProps {
  close: () => void
  title?: string
}

export const TagsModal = observer(({ close, title }: ITagsModalProps) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    zoneStore.fetchZoneTagsAsync()

    if (zoneStore.selectedTags.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isTags')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyAsync = async () => {
    zoneStore.createSelectedZoneFilter('isTags')

    if (zoneStore.isModeNOT) {
      zoneStore.addZone(['_tags', zoneStore.selectedTags, false])
    } else {
      zoneStore.addZone(['_tags', zoneStore.selectedTags])
    }

    if (zoneStore.isModeWithNotes) {
      zoneStore.addZone(['_tags', [...zoneStore.selectedTags, '_note']])
    }

    close()
  }

  const onClearAll = () => {
    zoneStore.unselectAllTags()
  }

  return (
    <PopperTableModal
      title={title}
      searchInputPlaceholder={t('ds.searchFilter')}
      onClose={close}
      searchValue={searchValue}
      onApply={handleApplyAsync}
      onChange={setSearchValue}
      onClearAll={onClearAll}
      className="mt-7"
      isTags={true}
    >
      <ZoneModalList
        items={zoneStore.tags.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
        isTags={true}
      />
    </PopperTableModal>
  )
})
