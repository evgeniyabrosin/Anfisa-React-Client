import { AxiosRequestConfig } from 'axios'

import { ServiceProviderBase } from '../common/service-provider-base'
import {
  IDsInfo,
  IDsInfoArguments,
  IDsList,
  IDsListArguments,
  IReccntArguments,
  IRecdataArguments,
  ISolutions,
  ISolutionsArguments,
  ITabReport,
  ITabReportArguments,
  IVsetupArguments,
  IVsetupAspectDescriptor,
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
    }).then(res => res.data)
  }

  public getDsList(params: IDsListArguments): Promise<IDsList> {
    return this.post<IDsList>('/ds_list', params).then(res => res.data)
  }

  public getRecCnt(params: IReccntArguments): Promise<TRecCntResponse[]> {
    return this.post<TRecCntResponse[]>('/reccnt', params).then(res => res.data)
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
}

export default new DatasetProvider()
