import { ReactElement, useEffect, useState } from 'react'
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

export const defaultLayout = [
  { y: 0, x: 0, w: 6, h: 1, i: 'view_gen' },
  { y: 1, x: 0, w: 6, h: 1, i: 'view_transcripts' },
  { y: 2, x: 0, w: 6, h: 1, i: 'view_qsamples' },
  { y: 3, x: 0, w: 6, h: 1, i: 'view_gnomAD' },
  { y: 4, x: 0, w: 6, h: 1, i: 'view_db' },
  { y: 5, x: 0, w: 6, h: 1, i: 'view_pred' },
  { y: 6, x: 0, w: 6, h: 1, i: 'view_genetics' },
  { y: 7, x: 0, w: 6, h: 1, i: '_main' },
  { y: 8, x: 0, w: 6, h: 1, i: 'transcripts' },
  { y: 9, x: 0, w: 6, h: 1, i: 'colocated_v' },
  { y: 10, x: 0, w: 6, h: 1, i: 'input' },
]

export const VariantDrawer = observer(
  (): ReactElement => {
    const drawerWidth = window.innerWidth - 380
    const localStorageData = window.localStorage.getItem('gridLayout')
    const currentGridLayout = localStorageData && JSON.parse(localStorageData)

    const [layout, setLayout] = useState(currentGridLayout || defaultLayout)

    useEffect(() => {
      return () => {
        closeHandler()
      }
    }, [])

    return (
      <div
        style={{
          transitionProperty: 'width',
          width: variantStore.drawerVisible ? drawerWidth : 0,
        }}
        className={cn(`bg-blue-lighter duration-200 ease-linear flex flex-col`)}
      >
        <VariantHeader setLayout={setLayout} />

        <VariantBody
          drawerWidth={drawerWidth}
          setLayout={setLayout}
          layout={layout}
        />
      </div>
    )
  },
)
