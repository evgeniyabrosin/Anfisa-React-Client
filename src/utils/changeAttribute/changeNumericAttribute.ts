import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'

export const changeNumericAttribute = (numericData: any[]) => {
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
    if (index <= 1) filteredAttribute.push(element)
  })

  filteredAttribute.push(numericData)

  body.append(
    'instr',
    JSON.stringify(['ATOM', 'EDIT', location, filteredAttribute]),
  )

  dtreeStore.fetchDtreeSetAsync(body)
}
