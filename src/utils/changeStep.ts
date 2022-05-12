import { toJS } from 'mobx'

import { ChangeStepActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import {
  ActionTypes,
  TInstrModifyingActions,
} from '@service-providers/decision-trees'
import datasetStore from '../store/dataset'

export const changeStep = (
  index: number,
  action: ChangeStepActionType,
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const locadStepData = toJS(dtreeStore.stepData)

  locadStepData.length = index + 1

  const emptyStepList = locadStepData.filter(
    element => element.groups.length === 0 && !element.isFinalStep,
  )

  const calculatedIndex = index - emptyStepList.length
  const stepIndex = dtreeStore.getStepIndexForApi(calculatedIndex)

  const isIncludeAction = action === 'BOOL-TRUE'
  const isExcludeAction = action === 'BOOL-FALSE'
  const isBooleanAction = isIncludeAction || isExcludeAction

  const indexes = toJS(dtreeStore.dtreeStepIndices)
  const isFinalStepIndex = calculatedIndex === indexes.length
  const isEmptyTree = indexes.length === 0

  const defaultLocation = isBooleanAction ? stepIndex + 1 : stepIndex
  const location = isFinalStepIndex && isEmptyTree ? stepIndex : defaultLocation

  dtreeStore.resetLocalDtreeCode()

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [ActionTypes.INSTR, action, location] as TInstrModifyingActions,
  })
}
