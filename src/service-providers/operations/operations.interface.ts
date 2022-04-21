import {
  TCondition,
  TZoneSetting,
} from 'service-providers/common/common.interface'

export interface IBaseExportArguments {
  ds: string
  filter?: string
  conditions?: ReadonlyArray<TCondition>
}

// export

export interface IExportOpearationArguments extends IBaseExportArguments {
  zone?: TZoneSetting[]
}

export interface IExportOpearation {
  kind: 'excel'
  fname: string
}

// csv_export

export interface ICsvExportArguments extends IExportOpearationArguments {
  schema?: string
}

// ds2ws

export interface IDs2WsArguments extends IBaseExportArguments {
  dtree?: string
  code?: string
  ws: string
  force?: string
}

export interface IDs2Ws {
  task_id: string
}

//export_ws

export interface IExportWsArguments {
  ds: string
  support?: boolean
  doc?: boolean
}

export interface IExportWs {
  kind: string
  url: string
}

//import_ws

export interface IImportWsArguments {
  name: string
  file: Blob
}

export interface IImportWs {
  created: string
  error: string
}
