import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore, { ZoneName } from '@store/filterZone'
import { Checkbox } from '@ui/checkbox/checkbox'
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
    useEffect(
      () => () => zoneStore.setSelectedItemsToLocalItems(zone),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    useEffect(() => {
      datasetStore.fetchZoneListAsync(zone)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [searchValue, setSearchValue] = useState('')

    const filteredItemList = itemList.filter(itemName =>
      itemName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    )

    const handleApply = () => {
      onClose()

      zoneStore.createSelectedZoneFilter('isGenes')
      datasetStore.addZone(['Symbol', zoneStore.selectedGenes])
      datasetStore.fetchWsListAsync()
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
        <PopupCard
          title={title}
          onClose={onClose}
          onApply={handleApply}
          className="relative bottom-16"
        >
          <div>
            <InputSearch
              value={searchValue}
              placeholder={'Search'}
              onChange={event => setSearchValue(event.target.value)}
            />

            <div className="my-5 flex justify-between">
              <span className="text-14 text-grey-blue">
                {zoneStore.getSelectedItemsQuantity(zone) + ' Selected'}
              </span>
              <span
                className="cursor-pointer text-12 text-blue-bright leading-14"
                onClick={() => zoneStore.clearLocalItems(zone)}
              >
                {t('general.clearAll')}
              </span>
            </div>

            <div className="h-60 overflow-y-scroll">
              {filteredItemList.map(itemName => {
                return (
                  <label
                    key={itemName}
                    className="flex items-center mb-4 text-12 font-medium cursor-pointer"
                  >
                    <Checkbox
                      checked={zoneStore.localGenes.includes(itemName)}
                      className="w-4 h-4 mr-2"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleCheck(event.target.checked, itemName, zone)
                      }
                    />
                    <span data-testid="checkbox-list-element">{itemName}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </PopupCard>
      </Portal>
    )
  },
)
