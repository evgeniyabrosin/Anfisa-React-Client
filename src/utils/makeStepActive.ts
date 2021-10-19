import dtreeStore from '@store/dtree'

export const makeStepActive = (index: number) => {
  const currentActiveIndex = dtreeStore.stepData.findIndex(
    element => element.isActive === true,
  )

  if (currentActiveIndex === index) return

  dtreeStore.setStepActive(index)
  const indexForApi = dtreeStore.getStepIndexForApi(index)
  const code = dtreeStore.dtreeCode

  dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
}
