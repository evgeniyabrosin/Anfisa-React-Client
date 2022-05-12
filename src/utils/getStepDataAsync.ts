import { toJS } from 'mobx'

import dtreeStore, { IStepData } from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import { TCondition } from '@service-providers/common'
import { PointCount } from '@service-providers/decision-trees'
import { fetchDtreeCountsAsync } from './fetchDtreeCounts'
import { getDataFromCode } from './getDataFromCode'

export const getStepDataAsync = async (
  isLoadingNewTree: boolean,
): Promise<IStepData[]> => {
  const pointCountsFromDtreeSet: PointCount[] = dtreeStore.dtree['point-counts']

  const isXlDataset = dtreeStore.dtree.kind === 'xl'

  if (isXlDataset) {
    const code = dtreeStore.dtreeCode
    const stepCount = pointCountsFromDtreeSet.length

    fetchDtreeCountsAsync(code, stepCount)
  } else {
    dtreeStore.setIsCountsReceived(true)
    dtreeStore.setPointCounts(toJS(pointCountsFromDtreeSet))
  }

  const stepCodes = getDataFromCode(dtreeStore.dtreeCode)

  const localStepData: IStepData[] = []
  const { activeStepIndex } = activeStepStore
  const atomsEntries = Object.entries(
    dtreeStore.dtree['cond-atoms'] as Record<string, TCondition[]>,
  )

  atomsEntries.forEach(([key, atom], index) => {
    const conditionPointIndex = parseInt(key, 10)

    localStepData.push({
      step: index + 1,
      groups: atom.filter((elem: any[]) => elem.length > 0),
      excluded: !stepCodes[index].result,
      isActive: isLoadingNewTree ? false : index === activeStepIndex,
      isReturnedVariantsActive: false,
      conditionPointIndex,
      returnPointIndex: conditionPointIndex + 1,
      comment: stepCodes[index].comment,
      negate: stepCodes[index].isNegate,
      all: stepCodes[index].isAll,
      condition: stepCodes[index].condition,
    })
  })

  localStepData.forEach((step: IStepData, index: number) => {
    if (step.groups.length > 1) {
      step.groups.forEach((group: any[], currNo: number) => {
        currNo !== 0 && group.splice(-1, 0, stepCodes[index].types[currNo - 1])
      })
    }
  })

  return localStepData
}
