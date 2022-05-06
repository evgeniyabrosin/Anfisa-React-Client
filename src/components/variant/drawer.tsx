import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { IGridLayout } from '@declarations'
import { SessionStoreManager } from '@core/storage-management/session-store-manager'
import columnsStore from '@store/ws/columns'
import variantStore from '@store/ws/variant'
import { VariantBody } from './ui/body'
import { VariantHeader } from './ui/header'

export const VariantDrawer = observer((): ReactElement => {
  const drawerWidth = window.innerWidth - 380

  const gridLayout = SessionStoreManager.read<IGridLayout[]>('gridLayout')

  const [layout, setLayout] = useState<IGridLayout[]>(
    gridLayout || variantStore.wsDrawerVariantsLayout,
  )

  useEffect(() => {
    return () => {
      columnsStore.closeDrawer()
    }
  }, [])

  return (
    <div
      style={{
        transitionProperty: 'width',
        width: variantStore.drawerVisible ? drawerWidth : 0,
      }}
      className={cn('bg-blue-lighter duration-200 ease-linear flex flex-col')}
    >
      <VariantHeader setLayout={setLayout} />

      <VariantBody
        drawerWidth={drawerWidth}
        setLayout={setLayout}
        layout={layout}
      />
    </div>
  )
})
