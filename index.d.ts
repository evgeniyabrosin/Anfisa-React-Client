declare global {
  interface Window {
    requestIdleCallback: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number
  }
}

let requestIdleCallback = window.requestIdleCallback

export interface DsDistItem {
  name: string
  'upd-time': Date
  kind: string
  note: string
  doc: any[][][]
  total: number
  'create-time': string
  'date-note'?: any
  ancestors: any[]
  'v-level': number
  'v-idx': number
  'v-idx-to': number
}

export interface DsDict {
  [key: string]: DsDistItem
}

export interface Documentation {
  id: string
  title: string
  url: string
}

export interface DirInfoI {
  version: string
  'ds-list': string[]
  'ds-dict': DsDist
  documentation: Documentation[]
}

export type DirInfoType = DirInfoI | Record<string, unknown>
export type DsDistItemType = DsDistItem | Record<string, unknown>

export interface NA24143 {
  affected: boolean
  family: string
  father: string
  id: string
  mother: string
  name: string
  sex: number
}

export interface NA24149 {
  affected: boolean
  family: string
  father: string
  id: string
  mother: string
  name: string
  sex: number
}

export interface NA24385 {
  affected: boolean
  family: string
  father: string
  id: string
  mother: string
  name: string
  sex: number
}

export interface Samples {
  NA24143: NA24143
  NA24149: NA24149
  NA24385: NA24385
}

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

export interface Meta {
  case: string
  cohorts: any[]
  data_schema: string
  modes: string[]
  proband: string
  record_type: string
  samples: Samples
  versions: Versions
}

export interface DsinfoI {
  name: string
  'upd-time'?: any
  kind: string
  note: string
  doc: string[][][]
  total: number
  'date-note'?: any
  ancestors: any[]
  meta: Meta
  cohorts: any[]
  'unit-groups': any[][]
}

export interface StatList {
  kind: string
  name: string
  vgroup: string
  'sub-kind': string
  detailed: boolean
  variants: any[][]
  title: string
  family: string[]
  affected: string[]
  available: string[]
  tooltip: string
  min: any
  max: any
  counts: number[]
  'trio-variants': string[]
  'approx-modes': string[][]
  labels: any[]
  render: string
  histogram?: any[][]
}

export type StatListType = StatList | Record<string, any>

export interface FilterList {
  name: string
  standard: boolean
  'upd-time'?: any
  'upd-from'?: any
  'eval-status': string
  'sol-version': number
}

export interface DsStatI {
  kind: string
  'total-counts': number[]
  'filtered-counts': number[]
  'stat-list': StatList[]
  'filter-list': FilterList[]
  'cur-filter'?: any
  'rq-id': string
  conditions: any[]
  'cond-seq': any[]
  'eval-status': string
  hash: string
}

export type DsStatType = DsStatI | Record<string, any>
export type DsInfoType = DsinfoI | Record<string, unknown>

export interface RecordI {
  no: number
  lb: string
  cl: string
  dt: string
}

export interface WsListI {
  ds: string
  'total-counts': number[]
  'filtered-counts': number[]
  records: RecordI[]
}

export type WsListType = WsListI | Record<string, unknown>

export interface Sample {
  genotype: string
  g_quality: number
}

export interface TabReportI {
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
  Samples: Sample[]
}

export type TabReportType = TabReportI | Record<string, unknown>

export interface RecTags {
  [key: string]: string
}

export interface WsTagsI {
  'check-tags': string[]
  'op-tags': string[]
  'rec-tags': RecTags
  'upd-time': Date
  'upd-from': string
  filters: string[]
  'tags-state': number
}

export type WsTagsType = WsTagsI | Record<string, unknown>

export interface ReccntRow {
  name: string
  title: string
  cells: [content: string, cell: string][]
  tooltip?: string
  render?: string
}

export interface ReccntDisplayItem {
  isOpen: boolean
  h: number
}

export interface ReccntCommon {
  name: string
  title: string
  kind: 'norm' | 'tech'
  type: 'table' | 'pre'
  columns?: number
  colhead?: any[]
  colgroup?: string[]
  rows?: ReccntRow[]
  parmodes?: any[]
  parcontrol?: string
  content?: string
}

export interface DsStatI {
  totalCounts: number[]
  'filtered-counts': number[]
  'stat-list': StatList[]
  'rq-id': string
}

export type DtreeStatType = DtreeStatI | Record<string, any>

export type ChangeStepActionType =
  | 'DUPLICATE'
  | 'DELETE'
  | 'NEGATE'
  | 'JOIN-AND'
  | 'JOIN-OR'
  | 'SPLIT'
  | 'BOOL-TRUE'
  | 'BOOL-FALSE'

export type FilterCountsType = number | '...' | null
