import { ReactElement, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import { VariantBody } from './ui/body'
import { VariantHeader } from './ui/header'

export const closeHandler = () => {
  variantStore.setDrawerVisible(false)

  setTimeout(() => {
    datasetStore.setAllColumn()
    datasetStore.showColumns()
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
        style={{ transitionProperty: 'width' }}
        className={cn(
          `bg-blue-lighter duration-200 ease-linear flex flex-col`,
          variantStore.drawerVisible ? 'w-4/5' : 'w-0',
        )}
      >
        <VariantHeader />

        <VariantBody />
      </div>
    )
  },
)
