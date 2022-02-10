import { toJS } from 'mobx'

import { ActionType, AttributeType } from '@declarations'
import dtreeStore from '@store/dtree'
import { getIndexWithoutEmptySteps } from '@utils/getIndexWithoutEmptySteps'
import datasetStore from '../store/dataset'

const getIndexForAddAttribute = (isJoin: boolean) => {
  const indexes = toJS(dtreeStore.dtreeStepIndices)

  const stepIndexWithoutEmptySteps = getIndexWithoutEmptySteps()

  const { currentStepIndex } = dtreeStore
  const index = isJoin ? stepIndexWithoutEmptySteps : currentStepIndex

  const prevIndexValue = +indexes[index - 1]

  const currentIndex = prevIndexValue + 2
  const indexForApi = Number.isNaN(prevIndexValue) ? 0 : currentIndex

  return indexForApi
}

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

  const isJoin = action === 'JOIN-AND' || action === 'JOIN-OR'
  const indexForApi = getIndexForAddAttribute(isJoin)

  const instruction = ['POINT', action, indexForApi, attribute]

  body.append('instr', JSON.stringify(instruction))

  dtreeStore.resetLocalDtreeCode()
  dtreeStore.fetchDtreeSetAsync(body)
}
