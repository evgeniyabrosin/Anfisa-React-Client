import { ServiceProviderBase } from '../common/service-provider-base'
import {
  IDsInfo,
  IDsInfoArguments,
  IDsList,
  IDsListArguments,
  IReccntArguments,
  TRecCntResponse,
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
}

export default new DatasetProvider()
