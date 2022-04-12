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

  importDataset(params: IImportWsArguments) {
    return this.post<IImportWs>('import_ws', params).then(res => res.data)
  }
}

export default new OperationsProvider()
