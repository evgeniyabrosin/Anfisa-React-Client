import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { tableColumnMap } from '@core/table-column-map'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore from '@store/filterZone'
import { PopperButton } from '@ui/popper-button'
import { PopperTableModal } from '@ui/popper-table-modal'
import { GeneList } from './gene-list'
import { HeaderTableButton } from './header-table-button'

const ButtonElement = ({ refEl, onClick }: any) => (
  <HeaderTableButton
    text={tableColumnMap.gene}
    refEl={refEl}
    onClick={onClick}
  />
)

const ModalElement = observer(({ close }: { close: () => void }) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const initAsync = async () => {
      await datasetStore.fetchZoneListAsync('Symbol')
    }

    initAsync()
  }, [])

  const handleApplyAsync = async () => {
    datasetStore.addZone(['Symbol', zoneStore.selectedGenes])

    await datasetStore.fetchWsListAsync()

    datasetStore.clearZone()
    close()
  }

  return (
    <PopperTableModal
      title={t('ds.gene')}
      searchInputPlaceholder={t('ds.searchFilter')}
      selectedAmount={zoneStore.selectedGenes.length}
      onClose={close}
      onClearAll={zoneStore.unselectAllGenes}
      searchValue={searchValue}
      onApply={handleApplyAsync}
      onChange={setSearchValue}
    >
      <GeneList
        genes={datasetStore.genes.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
      />
    </PopperTableModal>
  )
})

export const GeneHeaderTable = () => (
  <PopperButton ButtonElement={ButtonElement} ModalElement={ModalElement} />
)
