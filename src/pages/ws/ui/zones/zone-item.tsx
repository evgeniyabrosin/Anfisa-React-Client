import { MouseEvent, ReactElement, useState } from 'react'

import { t } from '@i18n'
import zoneStore, { ZoneName } from '@store/filterZone'
import { Button } from '@ui/button'
import { FilterTags } from '../filter-tags'
import { ZoneItemPopup } from './zone-item-popup'

export const ZoneItem = ({
  title,
  itemList,
  selectedItemList,
  localItemList,
  zone,
}: {
  title: string
  itemList: string[]
  selectedItemList: string[]
  localItemList: string[]
  zone: ZoneName
}): ReactElement => {
  const [shouldShowPopup, setShouldShowPopup] = useState(false)
  const isEmptySelectedItemList = selectedItemList.length === 0

  const handleOpenPopup = (event: MouseEvent) => {
    setShouldShowPopup(!shouldShowPopup)

    zoneStore.setZoneItemCoordinates(event.clientX - 50, event.clientY + 30)
  }

  return (
    <div>
      <div className="text-sm leading-16px  text-grey-blue font-medium mb-2 flex justify-between">
        <span className="pr-2">{title}</span>
        {!isEmptySelectedItemList && (
          <span
            className="flex item-center justify-between cursor-pointer text-blue-bright"
            onClick={handleOpenPopup}
          >
            {t('ds.edit')}
          </span>
        )}
      </div>

      {isEmptySelectedItemList && (
        <Button
          text="Add +"
          className=" h-4"
          style={{ padding: 0 }}
          onClick={handleOpenPopup}
        />
      )}

      <div
        style={{
          maxHeight: '70%',
          width: 'auto',
          maxWidth: 101,
          minWidth: 50,
        }}
        className="flex justify-between mt-0.4"
      >
        <FilterTags list={selectedItemList} zone={zone} />

        {shouldShowPopup && (
          <ZoneItemPopup
            title={title}
            itemList={itemList}
            zone={zone}
            onClose={() => setShouldShowPopup(false)}
            localItemList={localItemList}
          />
        )}
      </div>
    </div>
  )
}
