import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import {
  ActionTypes,
  AtomModifyingActionName,
  TAtomModifyingActions,
} from '@service-providers/decision-trees'

export const deleteAttribute = (groupIndexToChange?: number): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const { activeStepIndex } = stepStore

  const { location } = modalsControlStore

  const [indexForApi] = location

  const hasOneAttribute = stepStore.steps[activeStepIndex].groups.length === 1

  const action = hasOneAttribute ? ActionTypes.POINT : ActionTypes.ATOM

  let currentLocation

  const isInvalidAttribute =
    groupIndexToChange &&
    typeof groupIndexToChange === 'number' &&
    action === ActionTypes.ATOM

  if (isInvalidAttribute) {
    currentLocation = [indexForApi, groupIndexToChange]
  } else {
    currentLocation = hasOneAttribute ? indexForApi : location
  }

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      action,
      AtomModifyingActionName.DELETE,
      currentLocation,
    ] as TAtomModifyingActions,
  })
}
