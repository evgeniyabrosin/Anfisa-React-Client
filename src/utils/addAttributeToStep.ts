import { ActionType, AttributeType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import datasetStore from '../store/dataset'

export const addAttributeToStep = (
  action: ActionType,
  attributeType: AttributeType,
  filters: any = null,
  params: any = null,
  currentMode?: ModeTypes,
  // eslint-disable-next-line max-params
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const shouldTakeAttributeFromStore = attributeType !== 'numeric'

  const currentFilters = shouldTakeAttributeFromStore
    ? dtreeStore.selectedFilters
    : filters

  const subGroupName = dtreeStore.selectedGroups[1]
  const attribute = [attributeType, subGroupName, currentFilters]

  if (shouldTakeAttributeFromStore) {
    const conditionsJoinMode = getConditionJoinMode(currentMode)

    attribute.splice(2, 0, conditionsJoinMode)
  }

  if (params) attribute.push(params)

  const { stepIndexForApi } = activeStepStore

  const instruction = ['POINT', action, +stepIndexForApi, attribute]

  body.append('instr', JSON.stringify(instruction))

  dtreeStore.resetLocalDtreeCode()
  dtreeStore.fetchDtreeSetAsync(body)
}
