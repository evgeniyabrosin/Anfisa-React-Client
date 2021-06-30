import { ReactElement, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { VariantBody } from './ui/body'
import { VariantHeader } from './ui/header'

export const closeHandler = () => {
  variantStore.setDrawerVisible(false)

  setTimeout(() => {
    columnsStore.setAllColumn()
    columnsStore.showColumns()
  }, 200)
}

export const VariantDrawer = observer(
  (): ReactElement => {
    useEffect(() => {
      return () => {
        closeHandler()
      }
    }, [])

    return (
      <div
        style={{
          transitionProperty: 'width',
          width: variantStore.drawerVisible ? 'calc(100vw - 380px)' : 0,
        }}
        className={cn(`bg-blue-lighter duration-200 ease-linear flex flex-col`)}
      >
        <VariantHeader />

        <VariantBody />
      </div>
    )
  },
)
