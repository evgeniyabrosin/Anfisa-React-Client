import { FilterControlOptions } from '@pages/filter/ui/filter-control.const'
import { GlbPagesNames } from '@glb/glb-names'
import { PageRoute, Routes } from './routes.enum'

export const getPageRoute = (
  name: GlbPagesNames | FilterControlOptions,
): PageRoute => {
  let route = ''

  switch (name) {
    case GlbPagesNames.Table:
      route = Routes.WS
      break
    case GlbPagesNames.Filter:
      route = Routes.Filter
      break
    case GlbPagesNames.Refiner:
      route = Routes.Refiner
      break
  }

  return route as PageRoute
}
