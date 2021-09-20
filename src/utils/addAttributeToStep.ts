import dtreeStore from '@store/dtree'
import datasetStore from '../store/dataset'

type ActionType = 'POINT' | 'ATOM'
type MetodType = 'INSERT' | 'REPLACE'

export const addAttributeToStep = (
  subGroupName: string,
  action: ActionType = 'POINT',
  method: MetodType = 'INSERT',
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const index = dtreeStore.getLastStepIndexForApi()

  body.append(
    'instr',
    JSON.stringify([
      action,
      method,
      index,
      ['enum', subGroupName, '', dtreeStore.selectedFilters],
    ]),
  )

  dtreeStore.fetchDtreeSetAsync(body)
}
