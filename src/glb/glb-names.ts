import { Glb } from '@glb/glb'

export const GlbPagesNames = Glb.makeEnum({
  Root: 'root',
  Table: 'table',
  Filter: 'filter',
  Refiner: 'refiner',
  IGV: 'IGV',
})

export const GlbDatasetTypeNames = Glb.makeEnum({
  WS: 'ws',
  XL: 'xl',
})

export type GlbPagesNames = typeof GlbPagesNames[keyof typeof GlbPagesNames]
export type GlbDatasetTypeNames =
  typeof GlbDatasetTypeNames[keyof typeof GlbDatasetTypeNames]
