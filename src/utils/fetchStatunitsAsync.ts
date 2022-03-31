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
  const isRefiner = filterStore.method === GlbPagesNames.Refiner

  if (!isRefiner) {
    // Dtree has own fetch mechanism
    return
  }

  const incompletePropertyList: string[] = []

  const { conditions } = filterStore

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

  body.append('conditions', JSON.stringify(conditions))

  const response = await fetch(getApiUrl('statunits'), {
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

  datasetStore.setStatList(filteredStatList)

  fetchStatunitsAsync(newStatList, stepIndex)
}
