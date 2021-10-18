import dtreeStore from '@store/dtree'
import datasetStore from '../store/dataset'

type ActionType = 'INSERT' | 'REPLACE' | 'JOIN-AND' | 'JOIN-OR'
type AttributeType = 'enum' | 'numeric'

export const addAttributeToStep = (
  action: ActionType,
  attributeType: AttributeType,
  params: any = null,
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const isEnumAttribute = attributeType === 'enum'
  const currentParams = isEnumAttribute ? dtreeStore.selectedFilters : params
  const subGroupName = dtreeStore.selectedGroups[1]
  const attribute = [attributeType, subGroupName, currentParams]

  if (isEnumAttribute) {
    attribute.splice(2, 0, '')
  }

  const index = dtreeStore.getLastStepIndexForApi()
  const instruction = ['POINT', action, index, attribute]

  body.append('instr', JSON.stringify(instruction))

  dtreeStore.fetchDtreeSetAsync(body)
}
