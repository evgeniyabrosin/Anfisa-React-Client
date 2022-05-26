import { IStepData } from '@store/dtree'
import { adaptFilteringStatsCounts } from '@service-providers/common'
import { IDtreeSetResponse } from '@service-providers/decision-trees'
import { getDataFromCode } from '@utils/getDataFromCode'
import {
  IDtreeSet,
  IDtreeStatResponse,
  TDtreeStat,
} from './decision-trees.interface'

export const adaptDtreeStatResponse = (
  response: IDtreeStatResponse,
): TDtreeStat => {
  return {
    list: response['stat-list'],
    filteredCounts: adaptFilteringStatsCounts(response['filtered-counts']),
    totalCounts: adaptFilteringStatsCounts(response['total-counts']),
  }
}

export const adaptDtreeSetResponse = (
  response: IDtreeSetResponse,
): IDtreeSet => {
  const initialStep: IStepData = {
    step: 1,
    groups: [],
    excluded: true,
    isActive: false,
    isReturnedVariantsActive: false,
    conditionPointIndex: 0,
    returnPointIndex: null,
  }

  const stepCodes = getDataFromCode(response.code)

  const localSteps: IStepData[] = []
  const atomsEntries = Object.entries(response['cond-atoms'] ?? {})

  atomsEntries.forEach(([key, atom], index) => {
    const conditionPointIndex = parseInt(key, 10)

    localSteps.push({
      step: index + 1,
      groups: atom.filter((elem: any[]) => elem.length > 0),
      excluded: !stepCodes[index].result,
      isActive: false,
      isReturnedVariantsActive: false,
      conditionPointIndex,
      returnPointIndex: conditionPointIndex + 1,
      comment: stepCodes[index].comment,
      negate: stepCodes[index].isNegate,
      all: stepCodes[index].isAll,
      condition: stepCodes[index].condition,
    })
  })

  localSteps.forEach((step: IStepData, index: number) => {
    if (step.groups.length > 1) {
      step.groups.forEach((group: any[], currNo: number) => {
        currNo !== 0 && group.splice(-1, 0, stepCodes[index].types[currNo - 1])
      })
    }
  })

  const newSteps = localSteps.length === 0 ? [initialStep] : localSteps

  const points: unknown[] | undefined = response.points

  const finalStep: IStepData = {
    step: newSteps.length,
    groups: [],
    excluded: !stepCodes[stepCodes.length - 1]?.result,
    isActive: false,
    isReturnedVariantsActive: false,
    conditionPointIndex: null,
    returnPointIndex: points ? points.length - 1 : null,
    isFinalStep: true,
  }

  newSteps.push(finalStep)

  return { ...response, steps: newSteps }
}
