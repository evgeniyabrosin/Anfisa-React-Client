import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import dtreeModalStore from '../../pages/filter/modals.store'

export const changeFunctionalStep = (
  params: any,
  currentMode?: ModeTypes,
  isInheritanceMode?: boolean,
) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const { groupIndexToChange } = dtreeModalStore
  const { location } = modalEditStore
  const { activeStepIndex } = activeStepStore

  const attribute: any[] =
    dtreeStore.stepData[activeStepIndex].groups[groupIndexToChange]

  const filteredAttribute: any[] = []

  const filtersIndex = attribute.findIndex(element => Array.isArray(element))

  attribute.forEach((element, index) => {
    if (index <= 1 || index === filtersIndex) {
      filteredAttribute.push(element)
    } else if (index === 2) {
      const conditionsJoinMode = getConditionJoinMode(currentMode)

      filteredAttribute.push(conditionsJoinMode)
    }
  })

  if (isInheritanceMode) {
    filteredAttribute[filteredAttribute.length - 1] = dtreeStore.selectedFilters
  }

  filteredAttribute.push(params)

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )
  dtreeStore.fetchDtreeSetAsync(body)
}
