import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/active-step.store'
import modalEditStore from '@pages/filter/dtree/modals/modals-control.strore'

export const deleteAttribute = (): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const { activeStepIndex } = activeStepStore

  const { location } = modalEditStore

  const [indexForApi] = location

  const hasOneAttribute =
    dtreeStore.stepData[activeStepIndex].groups.length === 1
  const action = hasOneAttribute ? 'POINT' : 'ATOM'

  const currentLocation = hasOneAttribute ? indexForApi : location

  body.append('instr', JSON.stringify([action, 'DELETE', currentLocation]))

  dtreeStore.fetchDtreeSetAsync(body)
}
