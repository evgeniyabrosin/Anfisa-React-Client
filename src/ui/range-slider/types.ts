import { EnumValue, Glb } from '@glb/glb'

export type RangeSliderValue = [number | null, number | null] | [number | null]

export const RangeSliderMode = Glb.makeEnum({
  Single: 'single',
  Range: 'range',
})

export type RangeSliderMode = EnumValue<typeof RangeSliderMode>

export const RangeSliderScale = Glb.makeEnum({
  Linear: 'linear',
  Logarithmic: 'logarithmic',
})

export type RangeSliderScale = EnumValue<typeof RangeSliderScale>

export const RangeSliderColor = Glb.makeEnum({
  Primary: 'primary',
  Secondary: 'secondary',
})

export type RangeSliderColor = EnumValue<typeof RangeSliderColor>

export enum RangeSliderSide {
  None = 0,
  Left = 1,
  Right = 2,
  Both = 3,
}
