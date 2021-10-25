import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const editStepAttribute = (
  stepIndex: number,
  locationIndex: number,
  isNegate: boolean,
) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const stepIndexForApi = dtreeStore.getStepIndexForApi(stepIndex)
  const location = [stepIndexForApi, locationIndex]
  const attribute = dtreeStore.stepData[stepIndex].groups[locationIndex]

  const filteredAttribute = attribute.filter(
    (element: any) =>
      element !== 'OR' &&
      element !== 'and' &&
      element !== 'NOT' &&
      element !== 'or',
  )

  const negation = isNegate ? '' : 'NOT'

  filteredAttribute.splice(-1, 0, negation)

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )

  dtreeStore.fetchDtreeSetAsync(body)
}
