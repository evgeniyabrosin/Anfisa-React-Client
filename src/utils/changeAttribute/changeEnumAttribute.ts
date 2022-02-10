import uniq from 'lodash/uniq'

import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'

export const changeEnumAttribute = () => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const { currentStepIndex, groupIndexToChange } = dtreeStore

  const { location } = modalEditStore

  const attribute: any[] =
    dtreeStore.stepData[currentStepIndex].groups[groupIndexToChange]

  const filteredAttribute: any[] = []

  attribute.forEach((element, index) => {
    if (index <= 1) {
      filteredAttribute.push(element)
    } else if (index === 2) {
      const isNotNegate = element === 'and' || element === 'OR'
      const negateValue = isNotNegate ? '' : 'NOT'

      filteredAttribute.push(negateValue)
    }
  })

  filteredAttribute.push(uniq(dtreeStore.selectedFilters))

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )
  dtreeStore.fetchDtreeSetAsync(body)
}
