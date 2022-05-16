import { AxiosRequestConfig } from 'axios'

import { ServiceProviderBase } from '../common'
import { filteringProvider } from '../filtering-regime'
import { adaptDtreeStatResponse } from './decision-trees.adapters'
import {
  IDtreeCountsResponse,
  IDtreeSetArguments,
  IDtreeSetResponse,
  IDtreeStatArguments,
  IDtreeStatResponse,
  TDtreeStat,
  TGetFullDtreeStatOptions,
  TGetFullDtreeStatParams,
} from './decision-trees.interface'

class DecisionTreesProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public async getDtreeCounts(
    params: IDtreeSetArguments,
    options: Partial<AxiosRequestConfig<string>> = {},
  ): Promise<IDtreeCountsResponse> {
    const response = await this.post<IDtreeCountsResponse>(
      '/dtree_counts',
      params,
      options,
    )

    return response.data
  }
  // public async getFullDtreeCounts(): Promise<IDtreeCountsResponse> {}

  // TODO: dtree_check  Decision tree code check
  // TODO: dtree_cmp

  public async getDtreeStat(
    params: IDtreeStatArguments,
    options: Partial<AxiosRequestConfig<string>> = {},
  ): Promise<IDtreeStatResponse> {
    const response = await this.post<IDtreeStatResponse>(
      '/dtree_stat',
      params,
      options,
    )

    return response.data
  }

  public getFullDtreeStat(
    params: TGetFullDtreeStatParams,
    options: TGetFullDtreeStatOptions = {},
  ): Promise<TDtreeStat> {
    return filteringProvider.getFullStatUnitsBase(
      () =>
        this.getDtreeStat(
          {
            ...params,
            tm: 0,
          },
          {
            signal: options.abortSignal,
          },
        ).then(response => ({
          response: adaptDtreeStatResponse(response),
          unitsRequest: {
            ...params,
            rq_id: response['rq-id'],
          },
        })),
      options,
    )
  }

  public async getDtreeSet(
    params: IDtreeSetArguments,
    options: Partial<AxiosRequestConfig<string>> = {},
  ): Promise<IDtreeSetResponse> {
    const response = await this.post<IDtreeSetResponse>(
      '/dtree_set',
      params,
      options,
    )

    return response.data
  }
}

export default new DecisionTreesProvider()
