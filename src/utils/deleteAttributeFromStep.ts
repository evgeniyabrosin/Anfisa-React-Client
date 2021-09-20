import dtreeStore from '@store/dtree'
import datasetStore from '../store/dataset'

type ActionType = 'POINT' | 'ATOM'

export const deleteAttributeFromStep = (
  index: number,
  action: ActionType = 'POINT',
  locationIndex = 0,
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const stepIndex = dtreeStore.getStepIndexForApi(index)

  const atomLocation = [stepIndex, locationIndex]

  const location = action === 'POINT' ? stepIndex : atomLocation

  body.append('instr', JSON.stringify([action, 'DELETE', location]))

  dtreeStore.fetchDtreeSetAsync(body)
}
