import {
  adaptDataToCamelizedType,
  ServiceProviderBase,
} from '@service-providers/common'
import { TRecCntResponse } from './../dataset-level/dataset-level.interface'
import {
  IAdmDropDsArguments,
  IAdmReloadDsArguments,
  IDirInfo,
  IJobStatusArgument,
  ISingleCntArgument,
  TJobStatus,
} from './vault-level.interface'

class VaultProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public getDirInfo() {
    return this.get<IDirInfo>('dirinfo').then(res =>
      adaptDataToCamelizedType<IDirInfo>(res.data, ['ds-dict']),
    )
  }

  public getSingleCnt(params: ISingleCntArgument) {
    return this.post<TRecCntResponse>('single_cnt', params).then(
      res => res.data,
    )
  }

  public getJobStatus(params: IJobStatusArgument) {
    return this.post<TJobStatus>('job_status', params).then(res => res.data)
  }

  public updateAdm() {
    return this.post<string>('adm_update').then(res => res.data)
  }

  public reloadDs(params: IAdmReloadDsArguments) {
    return this.post<string>('adm_reload_ds', params).then(res => res.data)
  }

  public dropDs(params: IAdmDropDsArguments) {
    return this.post<string>('adm_drop_ds', params).then(res => res.data)
  }
}

export default new VaultProvider()
