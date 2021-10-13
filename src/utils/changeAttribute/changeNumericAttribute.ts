import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const changeNumericAttribute = (numericData: any[]) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const stepIndex = dtreeStore.currentStepIndex
  const locationIndex = dtreeStore.groupIndexToChange

  const stepIndexForApi = dtreeStore.getStepIndexForApi(stepIndex)
  const location = [stepIndexForApi, locationIndex]

  const attribute: any[] = dtreeStore.stepData[stepIndex].groups[locationIndex]

  const filteredAttribute = attribute.filter(
    (element: any) =>
      element !== 'OR' && element !== 'and' && element !== 'NOT',
  )

  filteredAttribute[filteredAttribute.length - 1] = numericData

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )

  dtreeStore.fetchDtreeSetAsync(body)
}
