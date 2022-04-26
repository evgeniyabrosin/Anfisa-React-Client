import { MouseEvent, ReactElement, useState } from 'react'

import { t } from '@i18n'
import zoneStore, { ZoneName } from '@store/filterZone'
import { Button } from '@ui/button'
import { FilterTags } from '../filter-tags'
import { ZoneItemPopup } from './zone-item-popup'

export const ZoneItem = ({
  title,
  itemList,
  zone,
  selectedItemList,
}: {
  title: string
  itemList: string[]
  zone: ZoneName
  selectedItemList: string[]
}): ReactElement => {
  const [shouldShowPopup, setShouldShowPopup] = useState(false)
  const isEmptySelectedItemList = selectedItemList.length === 0

  const handleOpenPopup = (event: MouseEvent) => {
    setShouldShowPopup(!shouldShowPopup)

    zoneStore.setZoneItemCoordinates(event.clientX - 50, event.clientY + 30)
  }

  return (
    <div>
      <div className="text-sm leading-16px  text-grey-blue font-medium mb-2 mr-3 flex justify-between">
        <span>{title}</span>
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
        <FilterTags data={selectedItemList} zone={zone} />

        {shouldShowPopup && (
          <ZoneItemPopup
            title={title}
            itemList={itemList}
            zone={zone}
            onClose={() => setShouldShowPopup(false)}
          />
        )}
      </div>
    </div>
  )
}
