import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'

export const makeStepActive = (
  index: number,
  option: 'isActive' | 'isReturnedVariantsActive' = 'isActive',
  isFinalStep = false,
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

  const localStepData = toJS(dtreeStore.stepData)
  const emptyStepList = localStepData.filter(
    element => element.groups.length === 0 && !element.isFinalStep,
  )

  const calculatedIndex = index - emptyStepList.length

  const indexForApi = isReturnedVariants
    ? dtreeStore.getStepIndexForApi(calculatedIndex) + 1
    : dtreeStore.getStepIndexForApi(calculatedIndex)

  const finalStepIndexForApi = dtreeStore.getStepIndexForApi(-1)
  const currentIndexForApi = isFinalStep ? finalStepIndexForApi : indexForApi

  const code = dtreeStore.dtreeCode

  dtreeStore.fetchDtreeStatAsync(code, String(currentIndexForApi))
}
