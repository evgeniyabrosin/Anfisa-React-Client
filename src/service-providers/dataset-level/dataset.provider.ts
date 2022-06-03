import { AxiosRequestConfig } from 'axios'

import { sleep } from '@core/sleep'
import {
  adaptDataToCamelizedType,
  ServiceProviderBase,
} from '@service-providers/common'
import { vaultProvider } from '@service-providers/vault-level'
import {
  IDsInfo,
  IDsInfoArguments,
  IDsList,
  IDsListArguments,
  IGetDsListCompleteResult,
  IReccntArguments,
  IRecdataArguments,
  ISolutions,
  ISolutionsArguments,
  ITabReport,
  ITabReportArguments,
  IVsetupArguments,
  IVsetupAspectDescriptor,
  TGetDsListCompleteOptions,
  TRecCntResponse,
  TRecdata,
} from './dataset-level.interface'

class DatasetProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public getDsInfo(params: IDsInfoArguments): Promise<IDsInfo> {
    return this.get<IDsInfo>('/dsinfo', {
      params,
    }).then(res => adaptDataToCamelizedType<IDsInfo>(res.data))
  }

  public getDsList(
    params: IDsListArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IDsList> {
    return this.post<IDsList>('/ds_list', params, options).then(res => res.data)
  }

  public getRecCnt(
    params: IReccntArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<TRecCntResponse[]> {
    return this.post<TRecCntResponse[]>('/reccnt', params, options).then(
      res => res.data,
    )
  }

  public getRecData(params: IRecdataArguments): Promise<TRecdata> {
    return this.post<TRecdata>('/recdata', params).then(res => res.data)
  }

  public getTabReport(
    params: ITabReportArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<ITabReport[]> {
    return this.post<ITabReport[]>('/tab_report', params, options).then(
      res => res.data,
    )
  }

  public getVSetup(params: IVsetupArguments): Promise<IVsetupAspectDescriptor> {
    return this.post<IVsetupAspectDescriptor>('/vsetup', params).then(
      res => res.data,
    )
  }

  public getSolutions(params: ISolutionsArguments): Promise<ISolutions> {
    return this.post<ISolutions>('/solutions', params).then(res => res.data)
  }

  public async getDsListComplete(
    params: IDsListArguments,
    options: TGetDsListCompleteOptions,
  ): Promise<IGetDsListCompleteResult> {
    const { abortSignal, onStatusChange } = options

    onStatusChange?.('Waiting for start...')

    const { task_id: task } = await this.getDsList(params, {
      signal: abortSignal,
    })
    let result: false | IGetDsListCompleteResult = false

    while (!result) {
      if (abortSignal && abortSignal.aborted) {
        throw new DOMException('fetch getSamples aborted', 'AbortError')
      }

      const response =
        await vaultProvider.getJobStatus<IGetDsListCompleteResult>(
          { task },
          { signal: abortSignal },
        )

      if (response) {
        result = response[0]
        onStatusChange?.(response[1])
      }

      if (!result) {
        await sleep(500)
      }
    }

    return result
  }
}

export default new DatasetProvider()
