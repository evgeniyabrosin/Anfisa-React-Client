import { Glb } from '@glb/glb'
import { GlbPagesNames } from '@glb/glb-names'

export const Routes = Glb.makeEnum({
  Root: '/',
  WS: '/ws',
  Filter: '/filter',
  Refiner: '/filter/refiner/',
  IGV: '/igv',
})

export const RouteNames = Glb.makeEnum({
  [Routes.Filter]: GlbPagesNames.Filter,
  [Routes.Refiner]: GlbPagesNames.Refiner,
  [Routes.WS]: GlbPagesNames.Table,
  [Routes.Root]: GlbPagesNames.Root,
  [Routes.IGV]: GlbPagesNames.IGV,
})

export type PageRoute = typeof Routes[keyof typeof Routes]
export type RouteNames = typeof RouteNames[keyof typeof RouteNames]
