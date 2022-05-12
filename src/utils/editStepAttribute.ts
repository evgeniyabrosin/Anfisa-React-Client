import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { ConditionJoinMode } from '@service-providers/common/common.interface'
import {
  ActionTypes,
  AtomModifyingActionName,
} from '@service-providers/decision-trees'

export const editStepAttribute = (
  stepIndex: number,
  locationIndex: number,
  isNegate: boolean,
) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const stepIndexForApi = dtreeStore.getStepIndexForApi(stepIndex)
  const location = [stepIndexForApi, locationIndex]
  const attribute = dtreeStore.stepData[stepIndex].groups[locationIndex]

  const filteredAttribute = attribute.filter(
    (element: any) =>
      element !== ConditionJoinMode.OR &&
      element !== ConditionJoinMode.AND &&
      element !== ConditionJoinMode.NOT &&
      element !== 'or',
  )

  const negation = isNegate ? '' : 'NOT'

  const lastAttribute = filteredAttribute[filteredAttribute.length - 1]
  const isLastAttributeArray = Array.isArray(lastAttribute)

  if (isLastAttributeArray) {
    filteredAttribute.splice(-1, 0, negation)
  } else {
    filteredAttribute.splice(-2, 0, negation)
  }

  dtreeStore.resetLocalDtreeCode()

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      ActionTypes.ATOM,
      AtomModifyingActionName.EDIT,
      location,
      filteredAttribute,
    ],
  })
}
