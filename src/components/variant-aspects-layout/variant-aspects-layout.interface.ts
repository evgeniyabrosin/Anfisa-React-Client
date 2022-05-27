import { Ref } from 'react'
import { Layout } from 'react-grid-layout'

import { TAspectDescriptor } from '@service-providers/dataset-level/dataset-level.interface'

export interface IVariantAspectsLayoutBaseProps {
  className?: string
  aspects: TAspectDescriptor[]
  igvUrl?: string
}

export type TVariantAspectsGridLayout = Layout[]

export type TVariantAspectsGridHandles = {
  maximizeAll: () => void
  minimizeAll: () => void
}

export type TVariantAspectsLayoutGridChangeHandler = (
  layout: TVariantAspectsGridLayout,
) => void

export interface IVariantAspectsLayoutGridProps
  extends IVariantAspectsLayoutBaseProps {
  layout?: TVariantAspectsGridLayout
  onChangeLayout?: TVariantAspectsLayoutGridChangeHandler
  handles?: Ref<TVariantAspectsGridHandles>
}

export interface IVariantAspectsLayoutGalleryProps
  extends IVariantAspectsLayoutBaseProps {
  activeAspect: string
  onChangeActiveAspect: (aspect: string) => void
}
