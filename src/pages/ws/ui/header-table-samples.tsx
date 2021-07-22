import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { tableColumnMap } from '@core/table-column-map'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore from '@store/filterZone'
import { PopperButton } from '@ui/popper-button'
import { PopperTableModal } from '@ui/popper-table-modal'
import { HeaderTableButton } from './header-table-button'
import { SampleList } from './sample-list'

const ButtonElement = ({ refEl, onClick }: any) => (
  <HeaderTableButton
    text={tableColumnMap.samples}
    refEl={refEl}
    onClick={onClick}
  />
)

const ModalElement = observer(({ close }: { close: () => void }) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const initAsync = async () => {
      if (datasetStore.samples.length > 0) {
        return
      }

      await datasetStore.fetchSamplesZoneAsync()
    }

    initAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyAsync = async () => {
    datasetStore.addZone(['Has_Variant', zoneStore.selectedSamples])

    await datasetStore.fetchWsListAsync()

    close()
  }

  return (
    <PopperTableModal
      title={t('ds.samples')}
      searchInputPlaceholder={t('ds.searchFilter')}
      selectedAmount={zoneStore.selectedSamples.length}
      onClose={close}
      onClearAll={zoneStore.unselectAllSamples}
      searchValue={searchValue}
      onApply={handleApplyAsync}
      onChange={setSearchValue}
    >
      <SampleList
        samples={datasetStore.samples.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
      />
    </PopperTableModal>
  )
})

export const SamplesHeaderTable = () => (
  <PopperButton ButtonElement={ButtonElement} ModalElement={ModalElement} />
)
