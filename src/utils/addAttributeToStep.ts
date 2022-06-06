import { ActionType, AttributeType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { TFuncArgs, TNumericConditionBounds } from '@service-providers/common'
import {
  ActionTypes,
  TPointModifyingActions,
} from '@service-providers/decision-trees'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import datasetStore from '../store/dataset/dataset'

export const addAttributeToStep = (
  action: ActionType,
  attributeType: AttributeType,
  filters: string[] | TNumericConditionBounds | null = null,
  param: TFuncArgs | null = null,
  currentMode?: ModeTypes,
  // eslint-disable-next-line max-params
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const shouldTakeAttributeFromStore = attributeType !== FilterKindEnum.Numeric

  const subGroupName = dtreeStore.selectedGroups[1]
  const attribute = [attributeType, subGroupName, filters]

  if (shouldTakeAttributeFromStore) {
    const conditionsJoinMode = getConditionJoinMode(currentMode)

    attribute.splice(2, 0, conditionsJoinMode)
  }

  if (param) attribute.push(param)

  const { stepIndexForApi } = stepStore

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      ActionTypes.POINT,
      action,
      +stepIndexForApi,
      attribute,
    ] as TPointModifyingActions,
  })

  dtreeStore.resetLocalDtreeCode()
}
