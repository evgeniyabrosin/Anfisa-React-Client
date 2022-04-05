import { AxiosRequestConfig } from 'axios'

import { ServiceProviderBase } from '../common'
import {
  IDsStat,
  IDsStatArguments,
  IStatfunc,
  IStatfuncArguments,
  IStatunits,
  IStatunitsArguments,
} from './filtering-regime.interface'

export class FilteringRegimeProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public async getStatUnits(
    params: IStatunitsArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IStatunits> {
    const response = await this.post<IStatunits>('/statunits', params, options)

    return response.data
  }

  public async getDsStat(
    params: IDsStatArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IDsStat> {
    const response = await this.post<IDsStat>('/ds_stat', params, options)
    return response.data
  }

  public async getStatFunc(
    params: IStatfuncArguments,
    options: Partial<AxiosRequestConfig> = {},
  ) {
    const response = await this.post<IStatfunc>('/statfunc', params, options)
    return response.data
  }
}

export default new FilteringRegimeProvider()
