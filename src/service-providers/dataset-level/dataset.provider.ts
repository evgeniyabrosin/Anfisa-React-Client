import axios, { AxiosResponse } from 'axios'

import { getApiUrl } from './../../core/get-api-url'
import { ServiceProviderBase } from './../common/service-provider-base'
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

  public getDsInfo(params: IDsInfoArguments) {
    return axios
      .get<IDsInfo, AxiosResponse<IDsInfo, IDsInfoArguments>, IDsInfoArguments>(
        getApiUrl('dsinfo'),
        {
          params,
        },
      )
      .then(res => res.data)
  }

  public getDsList(params: IDsListArguments) {
    const data = this.convertToURLParams(params)
    return axios
      .post<IDsList, AxiosResponse<IDsList, URLSearchParams>, URLSearchParams>(
        getApiUrl('ds_list'),
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(res => res.data)
  }

  public getRecCnt(params: IReccntArguments) {
    const data = this.convertToURLParams(params)
    return axios
      .post<
        TRecCntResponse[],
        AxiosResponse<TRecCntResponse[], URLSearchParams>,
        URLSearchParams
      >(getApiUrl('reccnt'), data)
      .then(res => res.data)
  }
}

export default new DatasetProvider()
