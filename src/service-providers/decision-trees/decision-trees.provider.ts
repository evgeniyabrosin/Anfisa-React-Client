import { AxiosRequestConfig } from 'axios'

import { ServiceProviderBase } from '../common'
import { filteringProvider } from '../filtering-regime'
import { adaptDtreeStatResponse } from './decision-trees.adapters'
import {
  IDeleteDecisionTreeParams,
  IDtreeSetArguments,
  IDtreeSetResponse,
  IDtreeStatArguments,
  IDtreeStatResponse,
  IGetFullDtreeStatParams,
  IUpdateDecisionTreeParams,
  TDtreeStat,
  TGetFullDtreeStatOptions,
} from './decision-trees.interface'

class DecisionTreesProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  // TODO: dtree_counts Delayed evaluations of item counts for decision tree points
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
    params: IGetFullDtreeStatParams,
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

  public updateDtree(
    params: IUpdateDecisionTreeParams,
    options?: Partial<AxiosRequestConfig>,
  ): Promise<IDtreeSetResponse> {
    return this.getDtreeSet(
      {
        ds: params.ds,
        code: params.code,
        instr: params.instr,
      },
      options,
    )
  }

  public deleteDtree(
    params: IDeleteDecisionTreeParams,
    options?: Partial<AxiosRequestConfig>,
  ): Promise<IDtreeSetResponse> {
    return this.getDtreeSet(
      {
        ds: params.ds,
        code: params.code,
        instr: params.instr,
      },
      options,
    )
  }
}

export default new DecisionTreesProvider()
