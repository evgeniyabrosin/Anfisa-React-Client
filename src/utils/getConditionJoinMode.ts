import { ModeTypes } from '@core/enum/mode-types-enum'
import { ConditionJoinMode } from '@service-providers/common/common.interface'

export const getConditionJoinMode = (
  currentMode?: ModeTypes,
): ConditionJoinMode => {
  if (!currentMode) return ConditionJoinMode.OR

  if (currentMode === ModeTypes.All) return ConditionJoinMode.AND

  if (currentMode === ModeTypes.Not) return ConditionJoinMode.NOT

  return ConditionJoinMode.OR
}
