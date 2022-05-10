import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore from '@store/filterZone'
import { PopperTableModal } from '@components/popper-table-modal'
import { ZoneModalList } from './components/zone-modal-list'

interface IGenesListModalProps {
  close: () => void
  title?: string
}

export const GenesListModal = observer(
  ({ close, title }: IGenesListModalProps) => {
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
      datasetStore.genesList.length <= 0 &&
        datasetStore.fetchZoneListAsync('Panels')

      if (zoneStore.selectedGenesList.length > 0) {
        zoneStore.syncSelectedAndLocalFilters('isGenesList')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleApplyAsync = async () => {
      zoneStore.createSelectedZoneFilter('isGenesList')
      datasetStore.addZone(['Panels', zoneStore.selectedGenesList])
      await datasetStore.fetchWsListAsync()

      close()
    }

    const onClearAll = () => {
      zoneStore.unselectAllGenesList()
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
        isGenesList={true}
      >
        <ZoneModalList
          items={datasetStore.genesList.filter(item =>
            item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
          )}
          isGenesList={true}
        />
      </PopperTableModal>
    )
  },
)
