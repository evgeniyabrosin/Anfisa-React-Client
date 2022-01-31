import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'

export const getCurrentStepIndexForApi = (
  index = dtreeStore.currentStepIndex,
) => {
  const prevIndexValue = Number(toJS(dtreeStore.dtreeStepIndices)[index - 1])

  const currentIndex = prevIndexValue + 2
  const indexForApi = Number.isNaN(prevIndexValue) ? 0 : currentIndex

  return indexForApi
}
