import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'
import { IStepData } from '@store/dtree/dtree.store'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import { TCondition } from '@service-providers/common'
import { PointCount } from '@service-providers/decision-trees'
import { fetchDtreeCountsAsync } from './fetchDtreeCounts'
import { getDataFromFrags } from './getDataFromFrags'

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

  const stepFrags = getDataFromFrags(dtreeStore.codeFrags)

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
      excluded: !stepFrags[index].decision,
      isActive: isLoadingNewTree ? false : index === activeStepIndex,
      isReturnedVariantsActive: false,
      conditionPointIndex,
      returnPointIndex: conditionPointIndex + 1,
      condition: stepFrags[index].condition,
      result: stepFrags[index].result,
    })
  })

  return localStepData
}
