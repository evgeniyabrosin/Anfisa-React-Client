import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore from '@store/filterZone'
import { PopperTableModal } from '@components/popper-table-modal'
import { ZoneModalList } from './components/zone-modal-list'

interface ISamplesModalProps {
  close: () => void
  title?: string
}

export const SamplesModal = observer(({ close, title }: ISamplesModalProps) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    datasetStore.samples.length <= 0 && datasetStore.fetchSamplesZoneAsync()

    if (zoneStore.selectedSamples.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isSamples')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyAsync = async () => {
    zoneStore.createSelectedZoneFilter('isSamples')
    datasetStore.addZone(['Has_Variant', zoneStore.selectedSamples])
    await datasetStore.fetchWsListAsync()

    datasetStore.fetchFilteredTabReportAsync()
    zoneStore.paintSelectedSamples()

    close()
  }

  const onClearAll = () => {
    zoneStore.unselectAllSamples('clearAll')
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
      isSamples={true}
    >
      <ZoneModalList
        items={datasetStore.samples.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
        isSamples={true}
      />
    </PopperTableModal>
  )
})
