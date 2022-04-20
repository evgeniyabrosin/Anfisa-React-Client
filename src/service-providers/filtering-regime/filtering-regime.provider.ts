import { AxiosRequestConfig } from 'axios'

import { adaptDsStatResponse } from '@service-providers/filtering-regime/filtering-regime.adapters'
import { ServiceProviderBase, TFilteringStat } from '../common'
import {
  DsStatArgumentsOptions,
  IDsStat,
  IDsStatArguments,
  IStatfunc,
  IStatfuncArguments,
  IStatunits,
  IStatunitsArguments,
  TDeleteFilterPresetParams,
  TDsStat,
  TGetFullDsStatOptions,
  TGetFullDsStatParams,
  TGetFullStatUnitsOptions,
  TJoinFilterPresetParams,
  TUpdateFilterPresetParams,
} from './filtering-regime.interface'
import { getIncompleteProps } from './filtering-regime.utils'

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

  public updateFilterPreset(
    params: TUpdateFilterPresetParams,
    options?: Partial<AxiosRequestConfig>,
  ): Promise<IDsStat> {
    return this.getDsStat(
      {
        ds: params.ds,
        conditions: params.conditions,
        instr: [DsStatArgumentsOptions.UPDATE, params.presetName],
      },
      options,
    )
  }

  public joinFilterPreset(
    params: TJoinFilterPresetParams,
    options?: Partial<AxiosRequestConfig>,
  ): Promise<IDsStat> {
    return this.getDsStat(
      {
        ds: params.ds,
        conditions: params.conditions,
        instr: [DsStatArgumentsOptions.JOIN, params.presetName],
        tm: 0,
      },
      options,
    )
  }

  public deleteFilterPreset(
    params: TDeleteFilterPresetParams,
    options?: Partial<AxiosRequestConfig>,
  ): Promise<IDsStat> {
    return this.getDsStat(
      {
        ds: params.ds,
        instr: [DsStatArgumentsOptions.DELETE, params.presetName],
      },
      options,
    )
  }

  public async getStatFunc(
    params: IStatfuncArguments,
    options: Partial<AxiosRequestConfig> = {},
  ) {
    const response = await this.post<IStatfunc>('/statfunc', params, options)
    return response.data
  }

  public getFullDsStat(
    params: TGetFullDsStatParams,
    options: TGetFullDsStatOptions,
  ): Promise<TDsStat> {
    return this.getFullStatUnitsBase(
      () =>
        this.getDsStat(
          {
            ...params,
            tm: 0,
          },
          {
            signal: options.abortSignal,
          },
        ).then(response => ({
          response: adaptDsStatResponse(response),
          unitsRequest: {
            rq_id: response['rq-id'],
            ...params,
          },
        })),
      options,
    )
  }

  public async getFullStatUnitsBase<Response extends TFilteringStat>(
    baseRequest: () => Promise<{
      response: Response
      unitsRequest: Omit<IStatunitsArguments, 'units'>
    }>,
    options: TGetFullStatUnitsOptions<Response> = {},
  ): Promise<Response> {
    const { abortSignal, onPartialResponse } = options

    const { response, unitsRequest } = await baseRequest()

    let result = response
    let incompleteProps = getIncompleteProps(response.list)

    while (incompleteProps.length > 0) {
      if (abortSignal && abortSignal.aborted) {
        throw new DOMException('fetch statunits aborted', 'AbortError')
      }

      if (onPartialResponse) {
        onPartialResponse(response)
      }

      const { units } = await this.getStatUnits(
        {
          ...unitsRequest,
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

export default new FilteringRegimeProvider()
