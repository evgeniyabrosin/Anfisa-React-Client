import styles from './variant-drawer.module.css'

import { ReactElement, useEffect, useRef } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import columnsStore from '@store/ws/columns'
import variantStore from '@store/ws/variant'
import {
  TVariantAspectsGridHandles,
  VariantAspectsLayoutGrid,
} from '@components/variant-aspects-layout'
import { variantDrawerStore } from '@pages/ws/ui/variant-drawer/variant-drawer.store'
import { VariantDrawerLayoutMode } from './variant-drawer.interface'
import { VariantDrawerHeader } from './variant-drawer-header'

interface IVariantDrawerProps {
  className?: string
}

export const VariantDrawer = observer(
  ({ className }: IVariantDrawerProps): ReactElement => {
    const { aspects } = variantStore
    const { layoutMode, gridLayout, gridWindowsOpenState, setGridLayout } =
      variantDrawerStore

    useEffect(() => {
      return () => {
        columnsStore.closeDrawer()
      }
    }, [])

    const gridHandles = useRef<TVariantAspectsGridHandles>(null)

    return (
      <div className={cn(styles.drawer, className)}>
        <VariantDrawerHeader
          className={styles.drawer__header}
          windowsOpenState={gridWindowsOpenState}
          onWindowsToggle={state => {
            if (state) {
              gridHandles.current?.maximizeAll()
            } else {
              gridHandles.current?.minimizeAll()
            }
          }}
        />
        {layoutMode == VariantDrawerLayoutMode.Grid && (
          <VariantAspectsLayoutGrid
            aspects={aspects}
            onChangeLayout={setGridLayout}
            layout={gridLayout}
            className={styles.drawer__layout}
            handles={gridHandles}
          />
        )}
      </div>
    )
  },
)
