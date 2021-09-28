import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'

export const fetchDtreeCountsAsync = async (
  code: string,
  requestId: string,
  stepCount: number,
  startIndex = 0,
  // eslint-disable-next-line max-params
) => {
  const points = [...new Array(stepCount - startIndex).keys()]
  const correctedPoints = points.map((element: number) => element + startIndex)

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    no: '0',
    code,
    points: JSON.stringify(correctedPoints),
    rq_id: requestId,
    tm: '1',
  })

  const response = await fetch(getApiUrl(`dtree_counts`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const result = await response.json()
  const pointCounts: [number | null][] = result['point-counts']

  dtreeStore.setPointCounts(pointCounts)

  const filteredPointCounts = pointCounts.filter(element => element !== null)

  if (pointCounts.length === filteredPointCounts.length) return

  const lastDownloadedIndex = filteredPointCounts.length - 1
  const newStartIndex = lastDownloadedIndex + 1

  fetchDtreeCountsAsync(code, requestId, stepCount, newStartIndex)
}
