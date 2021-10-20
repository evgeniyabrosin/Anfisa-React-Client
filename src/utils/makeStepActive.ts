import dtreeStore from '@store/dtree'

export const makeStepActive = (
  index: number,
  option: 'isActive' | 'isReturnedVariantsActive' = 'isActive',
) => {
  const currentActiveIndex = dtreeStore.stepData.findIndex(
    element => element[option] === true,
  )

  if (currentActiveIndex === index) return

  dtreeStore.setStepActive(index, option)

  const isReturnedVariants = option === 'isReturnedVariantsActive'

  const indexForApi = isReturnedVariants
    ? dtreeStore.getStepIndexForApi(index) + 1
    : dtreeStore.getStepIndexForApi(index)

  const code = dtreeStore.dtreeCode

  dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
}
