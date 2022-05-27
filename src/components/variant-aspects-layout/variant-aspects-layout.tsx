import { ReactElement } from 'react'
import cn from 'classnames'

import {
  IVariantAspectsLayoutGalleryProps,
  IVariantAspectsLayoutGridProps,
  VariantAspectsLayoutType,
} from './variant-aspects-layout.interface'
import { VariantAspectsLayoutGallery } from './variant-aspects-layout-gallery'
import { VariantAspectsLayoutGrid } from './variant-aspects-layout-grid'

export type TVariantAspectsLayoutProps =
  | IVariantAspectsLayoutGridProps
  | IVariantAspectsLayoutGalleryProps

export const VariantAspectsLayout = (
  props: TVariantAspectsLayoutProps,
): ReactElement => {
  const className = cn('bg-blue-lighter', props.className)

  switch (props.type) {
    case VariantAspectsLayoutType.Grid:
      return <VariantAspectsLayoutGrid {...props} className={className} />
    case VariantAspectsLayoutType.Gallery:
      return <VariantAspectsLayoutGallery {...props} className={className} />
  }
}
