import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import {
  AtomModifyingActionName,
  TAtomModifyingActions,
} from '@service-providers/decision-trees'

export const deleteAttribute = (groupIndexToChange?: number): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const { activeStepIndex } = activeStepStore

  const { location } = modalsControlStore

  const [indexForApi] = location

  const hasOneAttribute =
    dtreeStore.stepData[activeStepIndex].groups.length === 1

  const action = hasOneAttribute ? 'POINT' : 'ATOM'

  let currentLocation

  const isInvalidAttribute =
    groupIndexToChange &&
    typeof groupIndexToChange === 'number' &&
    action === 'ATOM'

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
