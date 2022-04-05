import uniq from 'lodash/uniq'

import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import dtreeModalStore from '../../pages/filter/modals.store'

export const changeEnumAttribute = (currentMode?: ModeTypes) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const { groupIndexToChange } = dtreeModalStore
  const { activeStepIndex } = activeStepStore
  const { location } = modalEditStore

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

  filteredAttribute.push(uniq(dtreeStore.selectedFilters))

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )
  dtreeStore.fetchDtreeSetAsync(body)
}
