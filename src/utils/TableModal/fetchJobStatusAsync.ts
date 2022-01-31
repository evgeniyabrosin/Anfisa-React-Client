import { getApiUrl } from '@core/get-api-url'
import dtreeStore from '@store/dtree'

export const fetchJobStatusAsync = async (taskId: string): Promise<any> => {
  if (!dtreeStore.shouldLoadTableModal) return

  const response = await fetch(getApiUrl(`job_status?task=${taskId}`))

  const result = await response.json()

  dtreeStore.setJobStatus(result)

  return !result[0]
    ? setTimeout(async () => await fetchJobStatusAsync(taskId), 1000)
    : { ok: true, data: result }
}
