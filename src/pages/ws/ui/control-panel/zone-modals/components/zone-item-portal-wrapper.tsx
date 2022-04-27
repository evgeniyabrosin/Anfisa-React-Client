import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'
import { Portal } from '@components/portal/portal'

export const ZoneItemPortalWrapper = observer(({ children }: any) => {
  const { zoneItemCoordinates } = zoneStore
  useEffect(() => () => zoneStore.clearZoneItemCoordinates(), [])

  return (
    <Portal>
      <div
        style={{
          inset: '0px auto auto 0px',
          position: 'absolute',
          transform: `translate(${zoneItemCoordinates?.x}px, ${zoneItemCoordinates?.y}px)`,
        }}
      >
        {children}
      </div>
    </Portal>
  )
})
