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

  const filteredAttribute = attribute.map(element => {
    switch (element) {
      case 'and':
      case 'OR':
      case 'NOT':
        return ''

      default:
        return element
    }
  })

  filteredAttribute[filteredAttribute.length - 1] = params

  if (isInheritanceMode) {
    filteredAttribute[filteredAttribute.length - 2] = dtreeStore.selectedFilters
  }

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )
  dtreeStore.fetchDtreeSetAsync(body)
}
