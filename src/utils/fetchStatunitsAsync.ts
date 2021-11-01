import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const fetchStatunitsAsync = async (
  statList: any[],
  stepIndex: string,
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

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    no: stepIndex,
    code: dtreeStore.dtreeCode,
    rq_id: requestId,
    tm: '1',
    units: JSON.stringify(incompletePropertyList),
  })

  const response = await fetch(getApiUrl(`statunits`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const result = await response.json()
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

  const changedDtreeStat = JSON.parse(JSON.stringify(dtreeStore.dtreeStat))

  changedDtreeStat['stat-list'] = newStatList

  dtreeStore.setDtreeStat(changedDtreeStat)

  fetchStatunitsAsync(newStatList, stepIndex)
}
