import { TVariantAspectsGridLayout } from '@components/variant-aspects-layout'

export enum VariantDrawerLayoutMode {
  Grid = 'grid',
  Gallery = 'gallery',
}

export enum VariantDrawerPredefinedPresets {
  List = 'list',
}

export interface IVariantDrawerGridPreset {
  name: string
  predefinedName?: VariantDrawerPredefinedPresets
  layout?: TVariantAspectsGridLayout
}

export interface IVariantDrawerData {
  mode: VariantDrawerLayoutMode
  presets: IVariantDrawerGridPreset[]
  preset: string | null
}
