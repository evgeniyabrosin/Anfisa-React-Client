import axios from 'axios'

import { getApiUrl } from '@core/get-api-url'
import { ServiceProviderBase } from '@service-providers/common'
import {
  ICsvExportArguments,
  IDs2Ws,
  IDs2WsArguments,
  IExportOpearation,
  IExportOpearationArguments,
  IExportWs,
  IExportWsArguments,
  IImportWs,
  IImportWsArguments,
} from './operations.interface'

class OperationsProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  exportCsv(params: ICsvExportArguments) {
    return this.post<Blob>('csv_export', params, { responseType: 'blob' }).then(
      res => res.data,
    )
  }

  export(params: IExportOpearationArguments) {
    return this.post<IExportOpearation>('export', params).then(res => res.data)
  }

  createWorkspace(params: IDs2WsArguments) {
    return this.post<IDs2Ws>('ds2ws', params).then(res => res.data)
  }

  exportDataset(params: IExportWsArguments) {
    return this.post<IExportWs>('export_ws', params).then(res => res.data)
  }

  importDataset({ file, name }: IImportWsArguments) {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('file', file)

    return axios
      .post<IImportWs>(getApiUrl('import_ws'), bodyFormData, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
  }
}

export default new OperationsProvider()
