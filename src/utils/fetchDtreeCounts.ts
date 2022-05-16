import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { PointCount } from '@service-providers/decision-trees'

export const fetchDtreeCountsAsync = async (
  code: string,
  stepCount: number,
  startIndex = 0,
) => {
  const points = [...new Array(stepCount - startIndex).keys()]
  const correctedPoints = points.map((element: number) => element + startIndex)
  const requestId = dtreeStore.dtree['rq-id']

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    no: '0',
    code,
    points: JSON.stringify(correctedPoints),
    rq_id: requestId,
    tm: '1',
  })

  const response = await fetch(getApiUrl('dtree_counts'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const result = await response.json()
  const pointCounts: PointCount[] = result['point-counts']

  dtreeStore.setPointCounts(pointCounts)

  const filteredPointCounts = pointCounts.filter(element => element !== null)

  if (pointCounts.length === filteredPointCounts.length) {
    dtreeStore.setIsCountsReceived(true)

    return
  }

  const lastDownloadedIndex = filteredPointCounts.length - 1
  const newStartIndex = lastDownloadedIndex + 1

  fetchDtreeCountsAsync(code, stepCount, newStartIndex)
}
