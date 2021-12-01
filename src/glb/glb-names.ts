import { Glb } from '@glb/glb'

export const GlbPagesNames = Glb.makeEnum({
  Root: 'root',
  Table: 'table',
  Filter: 'filter',
  Refiner: 'refiner',
})

export type GlbPagesNames = typeof GlbPagesNames[keyof typeof GlbPagesNames]
