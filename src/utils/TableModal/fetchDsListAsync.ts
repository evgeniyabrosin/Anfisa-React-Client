import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const fetchDsListAsync = async (requestValue: number | any[]) => {
  const stringRequestValue = JSON.stringify(requestValue)

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
  })

  if (typeof requestValue === 'number') {
    body.append('code', dtreeStore.dtreeCode)
    body.append('no', stringRequestValue)
  } else {
    body.append('conditions', stringRequestValue)
  }

  const response = await fetch(getApiUrl(`ds_list`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const result = await response.json()

  return result
}
