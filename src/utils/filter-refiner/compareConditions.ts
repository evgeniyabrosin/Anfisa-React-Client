import presetStore from '@store/filterPreset'
import { TCondition } from '@service-providers/common'

interface ICompareConditionsProps {
  currentConditions: TCondition[]
  startConditions: any[]
  currentPreset?: string
  prevPreset?: string
}

export const compareConditions = ({
  currentConditions,
  startConditions,
  currentPreset,
  prevPreset,
}: ICompareConditionsProps): boolean => {
  if (!currentPreset) return false

  if (currentConditions.length !== startConditions.length) return true

  if (prevPreset && currentPreset !== prevPreset) return true

  return presetStore.isPresetDataModified
}
