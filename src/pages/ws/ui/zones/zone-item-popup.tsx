import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import Checkbox from 'react-three-state-checkbox'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore, { ZoneName } from '@store/filterZone'
import { InputSearch } from '@components/input-search'
import { PopupCard } from '@components/popup-card/popup-card'
import { Portal } from '@components/portal/portal'

export const ZoneItemPopup = observer(
  ({
    title,
    itemList,
    onClose,
    zone,
  }: {
    title: string
    itemList: string[]
    onClose: () => void
    zone: ZoneName
  }): ReactElement => {
    // useEffect(
    //   () => () => {
    //     // handleDatasetStore.resetImportData()
    //   },
    //   [],
    // )

    useEffect(() => {
      datasetStore.fetchZoneListAsync(zone)
    }, [])
    const [searchValue, setSearchValue] = useState('')

    const selectedItemsQuantity = 0

    const filteredItemList = itemList.filter(itemName =>
      itemName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    )

    const handleApply = () => {
      onClose()

      zoneStore.createSelectedZoneFilter('isGenes')
      datasetStore.addZone(['Symbol', zoneStore.selectedGenes])
      datasetStore.fetchWsListAsync(datasetStore.isXL)
    }

    const handleCheck = (
      isChecked: boolean,
      itemName: string,
      zone: ZoneName,
    ) => {
      if (isChecked) {
        zoneStore.addItem(itemName, zone)
      } else {
        zoneStore.removeItem(itemName, zone)
      }
    }

    return (
      <Portal>
        <PopupCard title={title} onClose={onClose} onApply={handleApply}>
          <div>
            <InputSearch
              value={searchValue}
              placeholder={'Search'}
              onChange={event => setSearchValue(event.target.value)}
            />

            <div>
              <span className="text-14 text-grey-blue">
                {selectedItemsQuantity + ' Selected'}
              </span>
              <span className="cursor-pointer">{t('general.clearAll')}</span>
            </div>

            <div className="mt-5 h-60 overflow-y-scroll">
              {filteredItemList.map(itemName => {
                return (
                  <div key={itemName}>
                    <span>{itemName}</span>
                    <Checkbox
                      checked={false}
                      className="w-4 h-4"
                      onChange={event =>
                        handleCheck(event.target.checked, itemName, zone)
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </PopupCard>
      </Portal>
    )
  },
)
