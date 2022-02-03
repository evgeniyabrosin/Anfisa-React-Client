import { Glb } from '@glb/glb'
import { GlbPagesNames } from '@glb/glb-names'

export type FilterControlOptions = Exclude<
  GlbPagesNames,
  'table' | 'root' | 'IGV'
>

export const FilterControlOptions: FilterControlOption[] = [
  { value: GlbPagesNames.Filter, label: 'Decision Tree' },
  { value: GlbPagesNames.Refiner, label: 'Filter Refiner' },
]

export interface FilterControlOption {
  value: FilterControlOptions
  label: FilterControlOptionsNames
}

export const FilterControlOptionsNames = Glb.makeEnum({
  [GlbPagesNames.Filter]: 'Decision Tree',
  [GlbPagesNames.Refiner]: 'Filter Refiner',
})

export type FilterControlOptionsNames =
  typeof FilterControlOptionsNames[keyof typeof FilterControlOptionsNames]
