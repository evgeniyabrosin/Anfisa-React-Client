import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import {
  filteringProvider,
  IStatunitsArguments,
} from '@service-providers/filtering-regime'

export const fetchStatunitsAsync = async (
  statList: any[],
  stepIndex?: string,
) => {
  const incompletePropertyList: string[] = []

  statList.forEach(element => {
    if (element.incomplete) {
      incompletePropertyList.push(element.name)
    }
  })

  if (incompletePropertyList.length === 0) {
    dtreeStore.clearStatRequestId()

    return
  }

  const requestId = dtreeStore.statRequestId

  const body: IStatunitsArguments = {
    ds: datasetStore.datasetName,
    rq_id: requestId,
    tm: '1',
    units: incompletePropertyList,
    conditions: filterStore.conditions,
  }

  const result = await filteringProvider.getStatUnits(body)

  const calculatedUnits = result.units

  const newStatList = statList.map(element => {
    if (element?.incomplete) {
      const calculatedElement = calculatedUnits.find(
        (unit: any) => element.name === unit.name,
      )

      return calculatedElement ?? element
    }

    return element
  })

  datasetStore.setStatList(newStatList)

  fetchStatunitsAsync(newStatList, stepIndex)
}
