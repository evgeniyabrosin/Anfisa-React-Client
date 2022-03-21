import { AxiosRequestConfig } from 'axios'

import { ServiceProviderBase } from '../common'
import { filteringProvider } from '../filtering-regime'
import { adaptDtreeStatResponse } from './decision-trees.adapters'
import {
  IDtreeStatArguments,
  IDtreeStatResponse,
  TDtreeStat,
  TGetFullDtreeStatOptions,
  TGetFullDtreeStatParams,
} from './decision-trees.interface'
import { getIncompleteProps } from './decision-trees.utils'

class DecisionTreesProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  // TODO: dtree_set	Decision tree page setup
  // TODO: dtree_counts	Delayed evaluations of item counts for decision tree points
  // TODO: dtree_check	Decision tree code check
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

  public async getFullDtreeStat(
    params: TGetFullDtreeStatParams,
    options: TGetFullDtreeStatOptions = {},
  ): Promise<TDtreeStat> {
    const { abortSignal, onPartialResponse } = options

    const statResponse = await this.getDtreeStat(
      {
        ...params,
        tm: '0',
      },
      {
        signal: options.abortSignal,
      },
    )

    const requestId = statResponse['rq-id']

    let result = adaptDtreeStatResponse(statResponse)
    let incompleteProps = getIncompleteProps(result.list)

    while (incompleteProps.length > 0) {
      if (abortSignal && abortSignal.aborted) {
        throw new DOMException('fetchDtreeStat aborted', 'AbortError')
      }

      if (onPartialResponse) {
        onPartialResponse(result)
      }

      const { units } = await filteringProvider.getStatUnits(
        {
          ds: params.ds,
          no: params.no,
          rq_id: requestId,
          tm: '1',
          units: incompleteProps,
        },
        {
          signal: abortSignal,
        },
      )

      result = {
        ...result,
        list: result.list.map(prop => {
          const { name } = prop

          return units.find(item => item.name === name) ?? prop
        }),
      }

      incompleteProps = getIncompleteProps(result.list)
    }

    return result
  }
}

export default new DecisionTreesProvider()
