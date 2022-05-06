import { AxiosRequestConfig } from 'axios'

import { ServiceProviderBase } from './../common/service-provider-base'
import { adaptWsListResponse } from './ws-dataset-support.adapters'
import {
  IMacroTagging,
  IMacroTaggingArguments,
  ITagSelect,
  ITagSelectArguments,
  IWsList,
  IWsListArguments,
  IWsTags,
  IWsTagsArguments,
  IZoneListArguments,
  TZoneList,
} from './ws-dataset-support.interface'

class WsDatasetSupportProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public async getWsList(
    params: IWsListArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IWsList> {
    return this.post<IWsList>('/ws_list', params, options).then(res =>
      adaptWsListResponse(res.data),
    )
  }

  public getZoneList(params: IZoneListArguments): Promise<TZoneList> {
    return this.post<TZoneList>('/zone_list', params).then(res => res.data)
  }

  public getWsTags(params: IWsTagsArguments): Promise<IWsTags> {
    return this.post<IWsTags>('/ws_tags', params).then(res => res.data)
  }

  public getTagSelect(params: ITagSelectArguments): Promise<ITagSelect> {
    return this.get<ITagSelect>('/tag_select', { params }).then(res => res.data)
  }

  public updateMicroTagging(
    params: IMacroTaggingArguments,
  ): Promise<IMacroTagging> {
    return this.post<IMacroTagging>('/macro_tagging', params).then(
      res => res.data,
    )
  }
}

export default new WsDatasetSupportProvider()
