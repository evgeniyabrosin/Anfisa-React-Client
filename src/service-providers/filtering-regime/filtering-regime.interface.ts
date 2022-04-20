// ds_stat

import {
  DatasetKinds,
  IFuncPropertyStatus,
  ISolutionEntryDescription,
  TCondition,
  TFilteringStat,
  TItemsCount,
  TPropertyStatus,
} from 'service-providers/common'

export enum DsStatArgumentsOptions {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  JOIN = 'JOIN',
}

export interface IDsStatArguments {
  ds: string
  tm?: number
  filter?: string
  conditions?: ReadonlyArray<TCondition>
  instr?: [option: DsStatArgumentsOptions, filterName: string]
}

export interface IDsStatCondSeq {
  repr: string
  err?: string
  unit?: string
}

export interface IDsStat {
  kind: DatasetKinds
  'total-counts': TItemsCount
  'filtered-counts': TItemsCount
  'stat-list': TPropertyStatus[]
  'cur-filter'?: null | string
  conditions: TCondition[]
  'cond-seq': IDsStatCondSeq[]
  'eval-status': 'ok' | string
  hash: string
  'filter-list': ISolutionEntryDescription[]
  'rq-id': string
}

// statunits

export interface IStatunitsArguments {
  ds: string
  tm?: string
  rq_id: string
  filter?: string
  conditions?: ReadonlyArray<TCondition>
  dtree?: string
  code?: string
  no?: string
  units: string[]
}

export interface IStatunits {
  'rq-id': string
  units: TPropertyStatus[]
}

// statfunc

export interface IStatfuncArguments {
  ds: string
  rq_id: string
  filter?: string
  conditions?: ReadonlyArray<TCondition>
  dtree?: string
  code?: string
  no?: string
  unit: string
  param: string
}

export type IStatfunc = IFuncPropertyStatus

export type TDsStat = TFilteringStat

export type TGetFullDsStatParams = {
  ds: string
  conditions?: ReadonlyArray<TCondition>
  filter?: string
}

export type TGetFullStatUnitsOptions<
  Response extends TFilteringStat = TFilteringStat,
> = {
  abortSignal?: AbortSignal
  onPartialResponse?: (response: Response) => void
}

export type TGetFullDsStatOptions = TGetFullStatUnitsOptions<TDsStat>

export type TUpdateFilterPresetParams = {
  ds: string
  presetName: string
  conditions?: ReadonlyArray<TCondition>
}

export type TJoinFilterPresetParams = {
  ds: string
  presetName: string
  conditions?: ReadonlyArray<TCondition>
}

export type TDeleteFilterPresetParams = {
  ds: string
  presetName: string
}
