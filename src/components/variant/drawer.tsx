import { ReactElement, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
// import { VariantPage } from '@components/variant/page'

export const VariantDrawer = observer(
  (): ReactElement => {
    const closeHandler = () => {
      variantStore.setDrawerVisible(false)

      setTimeout(() => {
        datasetStore.setAllColumn()
        datasetStore.showColumns()
      }, 200)
    }

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
        <button className="p-4 text-white" onClick={closeHandler}>
          Закрыть
        </button>
        {/* <VariantPage /> */}
      </div>
    )
  },
)
