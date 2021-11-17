import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'

export const createEmptyStep = (
  stepIndex: number,
  position: 'BEFORE' | 'AFTER',
) => {
  dtreeStore.insertStep(position, stepIndex)

  const currentIndex = position === 'BEFORE' ? stepIndex : stepIndex + 1
  const indexForApi = dtreeStore.getStepIndexForApi(currentIndex)
  const code = toJS(dtreeStore.dtreeCode)

  dtreeStore.setCurrentStepIndexForApi(indexForApi)
  dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
}
