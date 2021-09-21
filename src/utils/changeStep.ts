import { ChangeStepActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import datasetStore from '../store/dataset'

export const changeStep = (
  index: number,
  action: ChangeStepActionType,
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const stepIndex = dtreeStore.getStepIndexForApi(index)

  const isIncludeAction = action === 'BOOL-TRUE'
  const isExcludeAction = action === 'BOOL-FALSE'
  const isBooleanAction = isIncludeAction || isExcludeAction

  const location = isBooleanAction ? stepIndex + 1 : stepIndex

  body.append('instr', JSON.stringify(['INSTR', action, location]))

  dtreeStore.fetchDtreeSetAsync(body)
}
