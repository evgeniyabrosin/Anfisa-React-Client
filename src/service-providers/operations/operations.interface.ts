import {
  TCondition,
  TZoneSetting,
} from 'service-providers/common/common.interface'

export interface IBaseExportArguments {
  ds: string
  filter?: string
  conditions?: TCondition[]
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
  schema: string
}

// ds2ws

export interface IDs2WsArguments extends IBaseExportArguments {
  dtree?: string
  code?: string
  ws: string
  force?: string
}

export interface IDs2WsArgument {
  task_id: string
}
