import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const deleteAttribute = (): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const stepIndex = dtreeStore.currentStepIndex
  const locationIndex = dtreeStore.groupIndexToChange

  const hasOneAttribute = dtreeStore.stepData[stepIndex].groups.length === 1

  const action = hasOneAttribute ? 'POINT' : 'ATOM'
  const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)

  const atomLocation = [indexForApi, locationIndex]
  const location = hasOneAttribute ? indexForApi : atomLocation

  body.append('instr', JSON.stringify([action, 'DELETE', location]))

  dtreeStore.fetchDtreeSetAsync(body)
}
