import { IStepData } from '@store/dtree'

export const calculateAcceptedVariants = (stepData: IStepData[]) => {
  const result = stepData.reduce((acc, element) => {
    if (!element.excluded) {
      return acc + Number(element.difference)
    }

    return acc
  }, 0)

  return result
}
