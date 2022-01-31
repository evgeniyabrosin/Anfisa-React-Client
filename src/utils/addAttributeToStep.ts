import { ActionType, AttributeType } from '@declarations'
import dtreeStore from '@store/dtree'
import datasetStore from '../store/dataset'
import { getCurrentStepIndexForApi } from './getCurrentStepIndexForApi'

export const addAttributeToStep = (
  action: ActionType,
  attributeType: AttributeType,
  filters: any = null,
  params: any = null,
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
    attribute.splice(2, 0, '')
  }

  if (params) attribute.push(params)

  const stepIndexForApi = getCurrentStepIndexForApi()
  const instruction = ['POINT', action, stepIndexForApi, attribute]

  body.append('instr', JSON.stringify(instruction))

  dtreeStore.resetLocalDtreeCode()
  dtreeStore.fetchDtreeSetAsync(body)
}
