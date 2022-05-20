import uniq from 'lodash/uniq'

import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import {
  ActionTypes,
  AtomModifyingActionName,
} from '@service-providers/decision-trees'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import modalsVisibilityStore from '../../pages/filter/dtree/components/modals/modals-visibility-store'

export const changeEnumAttribute = (
  currentMode?: ModeTypes,
  variants?: string[],
) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const { groupIndexToChange } = modalsVisibilityStore
  const { activeStepIndex } = activeStepStore
  const { location } = modalsControlStore

  const attribute: any[] =
    dtreeStore.stepData[activeStepIndex].groups[groupIndexToChange]

  const filteredAttribute: any[] = []

  attribute.forEach((element, index) => {
    if (index <= 1) {
      filteredAttribute.push(element)
    } else if (index === 2) {
      const conditionsJoinMode = getConditionJoinMode(currentMode)

      filteredAttribute.push(conditionsJoinMode)
    }
  })

  filteredAttribute.push(uniq(variants))

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
