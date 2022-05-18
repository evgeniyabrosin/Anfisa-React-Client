import { AxiosRequestConfig } from 'axios'

import { getIncompletePoints } from '@service-providers/filtering-regime/filtering-regime.utils'
import { ServiceProviderBase } from '../common'
import { filteringProvider } from '../filtering-regime'
import { adaptDtreeStatResponse } from './decision-trees.adapters'
import {
  IDtreeCountsArguments,
  IDtreeCountsResponse,
  IDtreeSetArguments,
  IDtreeSetResponse,
  IDtreeStatArguments,
  IDtreeStatResponse,
  IGetFullDreeCountsOptions,
  TDtreeStat,
  TGetFullDtreeStatOptions,
  TGetFullDtreeStatParams,
} from './decision-trees.interface'

class DecisionTreesProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public async getDtreeCounts(
    params: IDtreeCountsArguments,
    options: Partial<AxiosRequestConfig<string>> = {},
  ): Promise<IDtreeCountsResponse> {
    const response = await this.post<IDtreeCountsResponse>(
      '/dtree_counts',
      params,
      options,
    )

    return response.data
  }

  public async getFullDtreeCounts(
    params: IDtreeCountsArguments,
    options: IGetFullDreeCountsOptions,
  ) {
    const { abortSignal, onPartialResponse } = options

    let response = await this.getDtreeCounts(params)

    let incompletePoints = getIncompletePoints(response['point-counts'])

    while (incompletePoints.length > 0) {
      if (onPartialResponse) {
        onPartialResponse(response)
      }

      response = await this.getDtreeCounts(
        {
          ...params,
          points: incompletePoints,
        },
        { signal: abortSignal },
      )
      incompletePoints = getIncompletePoints(response['point-counts'])
    }

    return response
  }

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
