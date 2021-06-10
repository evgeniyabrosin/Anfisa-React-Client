import { ReactElement, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import { VariantHeader } from './header'
import { HeaderBaseInfo } from './ui/header-base-info'
import { TabContent } from './ui/tab-content'
import { Tabs } from './ui/tabs'

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
          `bg-blue-lighter overflow-hidden duration-200 ease-linear`,
          variantStore.drawerVisible ? 'w-4/5' : 'w-0',
        )}
      >
        <VariantHeader />

        <HeaderBaseInfo />

        <Tabs />

        <TabContent />
      </div>
    )
  },
)
