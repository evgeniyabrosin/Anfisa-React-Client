import dtreeStore from '@store/dtree'

export const makeStepActive = (index: number) => {
  dtreeStore.setStepActive(index)
  const indexForApi = dtreeStore.getStepIndexForApi(index)
  const code = dtreeStore.dtreeCode

  dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
}
