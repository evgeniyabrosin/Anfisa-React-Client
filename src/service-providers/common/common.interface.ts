import { ApproxValueTypes } from '@core/enum/approxValueTypes'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'

export enum DatasetKinds {
  WS = 'ws',
  XL = 'xl',
}

export type TItemsCount = [
  variantCounts: number,
  dnaVariantsCounts?: number,
  transcriptsCounts?: number,
]

export type TDateISOString = string

export type TNumericConditionBounds = [
  minimalBound: number | null,
  isMinimalNonStrict: boolean,
  maximumBound: number | null,
  isMaximalNonStrict: boolean,
]

export type TNumericCondition = [
  conditionType: 'numeric',
  propertyName: string,
  bounds: TNumericConditionBounds,
]

export enum ConditionJoinMode {
  OR = 'OR',
  AND = 'AND',
  NOT = 'NOT',
}

export type TRequestCondition = [number, TSelectValues]

export type TSelectValues = {
  [key: string]: string[]
}

export interface IInheritanceModeArgs {
  problem_group: string[]
}

export interface ICustomInheritanceModeArgs {
  scenario: [string, string[] | string]
}

export interface ICompoundHetArgs {
  approx: ApproxValueTypes | null
}

export interface ICompoundRequestArgs {
  approx: ApproxValueTypes | null
  request: TRequestCondition[]
  state?: string | null
}

export interface IGeneRegionArgs {
  locus: string
}

export type TEnumCondition = [
  conditionType: FilterKindEnum.Enum,
  propertyName: string,
  joinMode: ConditionJoinMode,
  valueVariants: string[],
]

export type TFuncArgs =
  | ICustomInheritanceModeArgs
  | IInheritanceModeArgs
  | ICompoundHetArgs
  | ICompoundRequestArgs
  | IGeneRegionArgs

export type TFuncCondition = [
  conditionType: 'func',
  propertyName: string,
  joinMode: ConditionJoinMode,
  valueVariants: string[],
  functionArguments: TFuncArgs,
]

export type TCondition = TNumericCondition | TEnumCondition | TFuncCondition

export type TVariant = [
  value: string,
  variantCounts: number,
  dnaVariantsCounts?: number,
  transcriptsCounts?: number,
]

export enum HistogramTypes {
  LIN = 'LIN',
  LOG = 'LOG',
}

export enum NumericPropertyStatusSubKinds {
  INT = 'int',
  FLOAT = 'float',
  'TRANSCRIPT_INT' = 'transcript-int',
  'TRANSCRIPT_FLOAT' = 'transcript-float',
}

export enum AttributeKinds {
  NUMERIC = 'numeric',
  ENUM = 'enum',
  FUNC = 'func',
}

export enum AttributeChartRenderModes {
  Pie = 'pie',
  Bar = 'bar',
  TreeMap = 'tree-map',
  Linear = 'linear',
  Log = 'log',
  Neighborhood = 'neighborhood',
}

export enum AttributeNumericRenderModes {
  Less = '<',
  Greater = '>',
  Equal = '=',
}

export type TAttributeRenderMode =
  | AttributeChartRenderModes
  | `${AttributeChartRenderModes.Linear},${AttributeNumericRenderModes}`
  | `${AttributeChartRenderModes.Log},${AttributeNumericRenderModes}`

export interface IBasePropertyStatus<Kind extends AttributeKinds> {
  name: string
  kind: Kind
  vgroup: string
  title?: string
  'render-mode'?: AttributeChartRenderModes
  tooltip?: string
  incomplete?: true
  detailed?: true
  classes?: number[][]
}

export type TNumericPropertyHistogram = [
  histogramType: HistogramTypes,
  minimalBound: number,
  maximumBound: number,
  numericCounts: number[],
]

export interface INumericPropertyStatus
  extends IBasePropertyStatus<AttributeKinds.NUMERIC> {
  min?: number
  max?: number
  counts?: TItemsCount[]
  histogram?: TNumericPropertyHistogram
  'sub-kind': NumericPropertyStatusSubKinds
}

export enum EnumPropertyStatusSubKinds {
  STATUS = 'status',
  MULTI = 'multi',
  TRANSCRIPTS_STATUS = 'transcript-status',
  TRANSCRIPTS_MULTI = 'transcript-multi',
}

export interface IEnumPropertyStatus
  extends IBasePropertyStatus<AttributeKinds.ENUM> {
  variants?: TVariant[]
  'sub-kind': EnumPropertyStatusSubKinds
}

export interface IFuncPropertyStatus
  extends IBasePropertyStatus<AttributeKinds.FUNC> {
  variants?: TVariant[]
  err?: string
  'rq-id': string
  no?: string
  scenario?: [string, string[]]
  request?: [string, string[]][]
  family?: string[]
  'approx-modes'?: string[][]
}

export type TPropertyStatus =
  | INumericPropertyStatus
  | IEnumPropertyStatus
  | IFuncPropertyStatus

export type TDocumentDescriptor = [
  documentName: string,
  pathToDocument: string,
  contentInformation?: unknown,
]

export interface IBaseDatasetDescriptor {
  name: string
  kind: 'ws' | 'xl'
  'create-time': TDateISOString
  'upd-time': null | TDateISOString
  note: null | string
  'date-note': null | TDateISOString
  total: number
  doc: TDocumentDescriptor
  ancestors: [
    ancestorDatasetName: string,
    datasetDocumentantion?: TDocumentDescriptor,
  ][]
}

export enum SolutionEntryDescriptionEvalStatuses {
  OK = 'ok',
  RUNTIME = 'runtime',
  ERROR = 'error',
}

export interface ISolutionEntryDescription {
  name: string
  standard: boolean
  'eval-status': SolutionEntryDescriptionEvalStatuses
  'upd-time'?: string
  'upd-from'?: string
  'sol-version': string
}

export type TZoneSetting = [
  zoneName: string,
  variants: string[],
  isNegationRequired?: false,
]

export enum TableColorCodes {
  GREY = 'grey',
  GREEN = 'green',
  YELLOW = 'yellow',
  YELLOW_CROSS = 'yellow-cross',
  RED = 'red',
  RED_CROSS = 'red-cross',
}

export interface IRecordDescriptor {
  cl: TableColorCodes
  lb: string
  no: number
  dt?: string
}

export type TFilteringStatCounts = {
  variants: number
  transcribedVariants: number | null
  transcripts: number | null
}

export type TFilteringStat = {
  list: TPropertyStatus[]
  filteredCounts: TFilteringStatCounts
  totalCounts: TFilteringStatCounts
}
