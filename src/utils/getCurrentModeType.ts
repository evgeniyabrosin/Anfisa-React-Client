import { ModeTypes } from '@core/enum/mode-types-enum'
import { ConditionJoinMode } from '@service-providers/common/common.interface'

export const getCurrentModeType = (
  conditionJoinMode?: ConditionJoinMode,
): ModeTypes | undefined => {
  if (!conditionJoinMode) return undefined

  if (conditionJoinMode === ConditionJoinMode.AND) return ModeTypes.All

  if (conditionJoinMode === ConditionJoinMode.NOT) return ModeTypes.Not

  return undefined
}
