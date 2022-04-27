import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'
import { Portal } from '@components/portal/portal'

interface IProps {
  children: ReactElement
}

export const ZoneItemPortalWrapper = observer(({ children }: IProps) => {
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
