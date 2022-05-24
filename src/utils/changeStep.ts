import { toJS } from 'mobx'

import { ChangeStepActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import {
  ActionTypes,
  InstrModifyingActionNames,
  TInstrModifyingActions,
} from '@service-providers/decision-trees'
import datasetStore from '../store/dataset/dataset'

export const changeStep = (
  index: number,
  action: ChangeStepActionType,
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  // TODO: rename variables
  const locadStepData = toJS(stepStore.steps)

  locadStepData.length = index + 1

  const emptyStepList = locadStepData.filter(
    element => element.groups.length === 0 && !element.isFinalStep,
  )

  const calculatedIndex = index - emptyStepList.length
  const stepIndex = dtreeStore.getStepIndexForApi(calculatedIndex)

  const isIncludeAction = action === InstrModifyingActionNames.BOOL_TRUE
  const isExcludeAction = action === InstrModifyingActionNames.BOOL_FALSE
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
