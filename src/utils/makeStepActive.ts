import dtreeStore from '@store/dtree'

export const makeStepActive = (
  index: number,
  option: 'isActive' | 'isReturnedVariantsActive' = 'isActive',
) => {
  const currentActiveIndex = dtreeStore.stepData.findIndex(
    element => element[option] === true,
  )

  const isReturnedVariants = option === 'isReturnedVariantsActive'

  const currentVariants = isReturnedVariants
    ? dtreeStore.stepData[index].difference
    : dtreeStore.stepData[index].startFilterCounts

  if (currentActiveIndex === index || currentVariants === 0) return

  dtreeStore.setStepActive(index, option)

  const indexForApi = isReturnedVariants
    ? dtreeStore.getStepIndexForApi(index) + 1
    : dtreeStore.getStepIndexForApi(index)

  const code = dtreeStore.dtreeCode

  dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
}
