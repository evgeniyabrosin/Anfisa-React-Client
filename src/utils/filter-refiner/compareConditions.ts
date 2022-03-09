import difference from 'lodash/difference'

import { Condition } from '@store/dataset'

interface ICompareConditionsProps {
  currentConditions: Condition[]
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

  return currentConditions.some((condition: any[], index) => {
    return difference(condition, startConditions[index]).length !== 0
  })
}
