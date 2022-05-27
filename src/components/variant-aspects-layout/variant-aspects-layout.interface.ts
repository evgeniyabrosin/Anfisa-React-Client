import { Layout } from 'react-grid-layout'

import { TAspectDescriptor } from '@service-providers/dataset-level/dataset-level.interface'

export enum VariantAspectsLayoutType {
  Grid = 'grid',
  Gallery = 'gallery',
}

export interface IVariantAspectsLayoutBaseProps<
  T extends VariantAspectsLayoutType = VariantAspectsLayoutType,
> {
  className?: string
  type: T
  aspects: TAspectDescriptor[]
  igvUrl?: string
}

export type TVariantAspectsGridLayout = Layout[]

export interface IVariantAspectsLayoutGridProps
  extends IVariantAspectsLayoutBaseProps<VariantAspectsLayoutType.Grid> {
  layout?: TVariantAspectsGridLayout
  onLayoutChange?: (layout: TVariantAspectsGridLayout) => void
}

export interface IVariantAspectsLayoutGalleryProps
  extends IVariantAspectsLayoutBaseProps<VariantAspectsLayoutType.Gallery> {
  activeAspect: string
  onChangeActiveAspect: (aspect: string) => void
}
