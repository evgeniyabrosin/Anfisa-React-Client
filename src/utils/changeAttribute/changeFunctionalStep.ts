import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const changeFunctionalStep = (
  params: any,
  isInheritanceMode = false,
) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const stepIndex = dtreeStore.currentStepIndex
  const locationIndex = dtreeStore.groupIndexToChange

  const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)
  const location = [indexForApi, locationIndex]

  const attribute: any[] = dtreeStore.stepData[stepIndex].groups[locationIndex]

  const filteredAttribute: any[] = []

  const filtersIndex = attribute.findIndex(element => Array.isArray(element))

  attribute.forEach((element, index) => {
    if (index <= 1 || index === filtersIndex) {
      filteredAttribute.push(element)
    } else if (index === 2) {
      const isNotNegate = element === 'and' || element === 'OR'
      const negateValue = isNotNegate ? '' : 'NOT'

      filteredAttribute.push(negateValue)
    }
  })

  if (isInheritanceMode) {
    filteredAttribute[filteredAttribute.length - 1] = dtreeStore.selectedFilters
  }

  filteredAttribute.push(params)

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )
  dtreeStore.fetchDtreeSetAsync(body)
}
