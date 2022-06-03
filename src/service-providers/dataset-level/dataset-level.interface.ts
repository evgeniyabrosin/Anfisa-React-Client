import {
  IBaseDatasetDescriptor,
  IRecordDescriptor,
  TCondition,
} from 'service-providers/common'

// dsinfo

export interface IDsInfoArguments {
  ds: string
  note?: string
}

export interface IDsInfoClass {
  title: string
  values: string[]
}

export enum HgModes {
  HG19 = 'hg19',
  HG38 = 'hg38',
}

// this is an auto-generated interface and is not in the documentation

export interface Versions {
  'Anfisa load': string
  GERP: string
  annotations: string
  annotations_build: string
  annotations_date: string
  bcftools_annotate_version: string
  gatk: string
  gatk_select_variants: string
  pipeline: string
  reference: string
  vep_version: string
}

export interface IDsInfoMeta {
  case?: string
  cohorts?: any[]
  data_schema?: string
  modes?: HgModes[]
  proband?: string
  record_type?: string
  samples?: unknown
  versions?: Versions

  [key: string]: unknown
}

export interface IDsInfo extends IBaseDatasetDescriptor {
  meta: IDsInfoMeta
  classes: IDsInfoClass[]
  unitGroups: string[]
  cohorts: string[]
  exportMaxCount: number
  igvUrls?: string[]
  name: string
  note: string
  total: number
  ancestors: any[]
}

// ds_list

export interface IDsListArguments {
  ds: string
  filter?: string
  conditions?: ReadonlyArray<TCondition>
  dtree?: string
  code?: string
  no?: number
  smpcnt?: string
}

export interface IDsList {
  task_id: string
}

// reccnt

export interface IReccntArguments {
  ds: string
  rec: number
  details?: string
  samples?: number[]
}

export enum CommonAspectDescriptorKinds {
  norm = 'norm',
  tech = 'tech',
}

export enum AspectDescriptorTypes {
  Table = 'table',
  Pre = 'pre',
}

export interface ICommonAspectDescriptor<T extends AspectDescriptorTypes> {
  type: T
  name: string
  title: string
  kind: CommonAspectDescriptorKinds
}

export interface IAttributeDescriptors {
  name: string
  title: string
  cells: [content: string, cellClassName: string][]
  tooltip: string | undefined
  render: string | undefined
}

export interface ITableAspectDescriptor
  extends ICommonAspectDescriptor<AspectDescriptorTypes.Table> {
  columns: number
  colhead: null | [title: string, count: number][]
  colgroup?: null | string[]
  rows: [] | IAttributeDescriptors[]
  parcontrol: string | undefined
  parmodes: Record<string, unknown>[] | undefined
}

export interface IPreAspectDescriptor
  extends ICommonAspectDescriptor<AspectDescriptorTypes.Pre> {
  content: string
}

export type TAspectDescriptor = ITableAspectDescriptor | IPreAspectDescriptor

export type TRecCntResponse = TAspectDescriptor

export enum AspectCellRenderClass {
  Norm = 'norm',
  Hit = 'hit',
  NoTrHit = 'no-tr-hit',
}

// recdata

export interface IRecdataArguments {
  ds: string
  rec: number
}

export type TRecdata = any

// tab_report

export interface ITabReportArguments {
  ds: string
  seq: number[]
  schema: string
}

export interface ITabReport {
  _no: number
  ClinVar: string[]
  HGMD: string[]
  Gene: string[]
  Coordinate: string
  Change: string
  MSQ: string[]
  'Protein Change': string[]
  Polyphen: string[]
  SIFT: string[]
  'MUT TASTER': string[]
  FATHMM: string[]
  gnomAD_Overall_AF: number
  gnomAD_Overall_AF_Popmax: number
  gnomAD_Genomes_AF: number
  gnomAD_Exomes_AF: number
  gnomAD_Overall_Hom: number
  gnomAD_Overall_Hem?: any
  QD: number
  FT: string[]
  GTEx: string[][]
  IGV?: any
  gnomAD: string[]
  Samples: ISample[]
}

export interface ISample {
  genotype: string
  g_quality: number
}

// vsetup

export interface IVsetupArguments {
  ds: string
}

export interface IVsetupAspectDescriptorAttrs {
  name: string
  title: string
  kind: string
  is_seq: boolean
  tooltip?: string
}

export interface IVsetupAspectDescriptor {
  name: string
  title: string
  source: 'view' | 'data'
  field?: string
  ignored: boolean
  col_groups?: [columnTitle: string, columnCount: number][]
  attrs: IVsetupAspectDescriptorAttrs[]
}

// solutions

export interface ISolutionsArguments {
  ds: string
}

export interface ISolutions {
  [nameOfSolution: string]: string[]
}

export interface IGetDsListCompleteResult {
  samples: IRecordDescriptor[]
  records?: IRecordDescriptor[]
}

export type TGetDsListCompleteOptions = {
  abortSignal?: AbortSignal
  onStatusChange?: (status: string) => void
}
