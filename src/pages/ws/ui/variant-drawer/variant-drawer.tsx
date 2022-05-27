import styles from './variant-drawer.module.css'

import { ReactElement, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import columnsStore from '@store/ws/columns'
import variantStore from '@store/ws/variant'
import {
  IVariantAspectsLayoutBaseProps,
  TVariantAspectsLayoutProps,
  VariantAspectsLayout,
  VariantAspectsLayoutType,
} from '@components/variant-aspects-layout'
import { variantLayoutStore } from '@pages/ws/ui/variant-drawer/variant-drawer.store'
import { VariantDrawerHeader } from './variant-drawer-header'

interface IVariantDrawerProps {
  className?: string
}

export const VariantDrawer = observer(
  ({ className }: IVariantDrawerProps): ReactElement => {
    const { aspects } = variantStore
    const {
      type,
      gridLayout,
      galleryActiveAspect,
      setGridLayout,
      setGalleryActiveAspect,
    } = variantLayoutStore

    useEffect(() => {
      return () => {
        columnsStore.closeDrawer()
      }
    }, [])

    const layoutBaseProps: Omit<IVariantAspectsLayoutBaseProps, 'type'> = {
      aspects,
      className: styles.drawer__layout,
    }
    let layoutProps: TVariantAspectsLayoutProps
    if (type === VariantAspectsLayoutType.Grid) {
      layoutProps = {
        type,
        onLayoutChange: setGridLayout,
        layout: gridLayout,
        ...layoutBaseProps,
      }
    } else {
      layoutProps = {
        type,
        activeAspect: galleryActiveAspect,
        onChangeActiveAspect: setGalleryActiveAspect,
        ...layoutBaseProps,
      }
    }

    return (
      <div className={cn(styles.drawer, className)}>
        <VariantDrawerHeader className={styles.drawer__header} />
        <VariantAspectsLayout {...layoutProps} />
      </div>
    )
  },
)
