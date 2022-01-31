import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { GlbPagesNames } from '@glb/glb-names'
import { getFilteredAttrsList } from './getFilteredAttrsList'

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

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    rq_id: requestId,
    tm: '1',
    units: JSON.stringify(incompletePropertyList),
  })

  const isRefiner = filterStore.method === GlbPagesNames.Refiner

  if (isRefiner) {
    const conditions = JSON.stringify(datasetStore.conditions)

    body.append('conditions', conditions)
  } else {
    stepIndex && body.append('no', stepIndex)
    dtreeStore.dtreeCode && body.append('code', dtreeStore.dtreeCode)
  }

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

  const filteredStatList = getFilteredAttrsList(newStatList)

  isRefiner
    ? datasetStore.setStatList(filteredStatList)
    : dtreeStore.setStatList(filteredStatList)

  fetchStatunitsAsync(newStatList, stepIndex)
}
