import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import zoneStore from '@store/ws/zone'
import { PopperTableModal } from '@components/popper-table-modal'
import { ZoneModalList } from './components/zone-modal-list'
interface IGenesModalProps {
  close: () => void
  title?: string
}

export const GenesModal = observer(({ close, title }: IGenesModalProps) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    zoneStore.genes.length <= 0 && zoneStore.fetchZoneListAsync('Symbol')

    if (zoneStore.selectedGenes.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isGenes')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyAsync = async () => {
    zoneStore.createSelectedZoneFilter('isGenes')
    zoneStore.addZone(['Symbol', zoneStore.selectedGenes])

    close()
  }

  const onClearAll = () => {
    zoneStore.unselectAllGenes()
  }

  return (
    <PopperTableModal
      title={title}
      searchInputPlaceholder={t('ds.searchFilter')}
      onClose={close}
      searchValue={searchValue}
      onApply={handleApplyAsync}
      onClearAll={onClearAll}
      onChange={setSearchValue}
      className="mt-7"
      isGenes={true}
    >
      <ZoneModalList
        items={zoneStore.genes.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
        isGenes={true}
      />
    </PopperTableModal>
  )
})
