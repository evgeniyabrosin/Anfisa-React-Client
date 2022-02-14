import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'

export const changeFunctionalStep = (
  params: any,
  isInheritanceMode = false,
) => {
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

  const filtersIndex = attribute.findIndex(element => Array.isArray(element))

  attribute.forEach((element, index) => {
    if (index <= 1 || index === filtersIndex) {
      filteredAttribute.push(element)
    } else if (index === 2) {
      const isNotNegate = element === 'and' || element === 'OR'
      const negateValue = isNotNegate ? '' : 'NOT'

      filteredAttribute.push(negateValue)
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
