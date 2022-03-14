import dtreeStore, { IStepData } from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import { fetchDtreeCountsAsync } from './fetchDtreeCounts'
import { getDataFromCode } from './getDataFromCode'

export const getStepDataAsync = async (
  isLoadingNewTree: boolean,
): Promise<IStepData[]> => {
  const dtreeSteps = Object.values(dtreeStore.dtree['cond-atoms'])

  const pointCountsFromDtreeSet: number[][] = dtreeStore.dtree['point-counts']

  const isXlDataset = dtreeStore.dtree.kind === 'xl'

  if (isXlDataset) {
    const code = dtreeStore.dtreeCode
    const stepCount = pointCountsFromDtreeSet.length

    fetchDtreeCountsAsync(code, stepCount)
  } else {
    dtreeStore.setIsCountsReceived(true)

    const pointCounts = pointCountsFromDtreeSet.map(element =>
      element.filter((_element, index) => index === 0),
    )

    dtreeStore.setPointCounts(pointCounts)
  }

  const stepCodes = getDataFromCode(dtreeStore.dtreeCode)

  const localStepData: IStepData[] = []
  const { activeStepIndex } = activeStepStore

  dtreeSteps.map((item: any, index: number) => {
    localStepData.push({
      step: index + 1,
      groups: item.filter((elem: any[]) => elem.length > 0),
      excluded: !stepCodes[index].result,
      isActive: isLoadingNewTree ? false : index === activeStepIndex,
      isReturnedVariantsActive: false,
      startFilterCounts: '...',
      finishFilterCounts: '...',
      difference: '...',
      comment: stepCodes[index].comment,
      negate: stepCodes[index].isNegate,
      condition: stepCodes[index].condition,
    })
  })

  localStepData.map((step: IStepData, index: number) => {
    if (step.groups.length > 1) {
      step.groups.map((group: any[], currNo: number) => {
        currNo !== 0 && group.splice(-1, 0, stepCodes[index].types[currNo - 1])
      })
    }
  })

  return localStepData
}
