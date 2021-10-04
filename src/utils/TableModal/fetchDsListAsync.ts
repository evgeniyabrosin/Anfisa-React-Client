import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const fetchDsListAsync = async (no: number) => {
  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    no: String(no),
    code: dtreeStore.dtreeCode,
  })

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
