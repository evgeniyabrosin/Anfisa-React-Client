declare global {
  interface Window {
    _env_: {
      REACT_APP_URL_BACKEND: string
    }
  }
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

export type StatHistogram = [
  type: 'LIN' | 'LOG',
  min: number,
  max: number,
  values: number[],
]

export interface StatList {
  kind: string
  name: string
  vgroup: string
  'sub-kind': SubKinds
  detailed: boolean
  variants: [string, number][]
  title: string
  family: string[]
  affected: string[]
  available: string[]
  tooltip: string
  min: number
  max: number
  counts: number[]
  'trio-variants': string[]
  'approx-modes': string[][]
  labels: any[]
  'render-mode'?: string
  histogram?: StatHistogram
  incomplete?: boolean
}

export interface FilterList {
  name: string
  standard: boolean
  'upd-time'?: any
  'upd-from'?: any
  'eval-status': string
  'sol-version': number
}

export interface ReccntDisplayItem {
  isOpen: boolean
  h: number
}

export type ChangeStepActionType =
  | 'DUPLICATE'
  | 'DELETE'
  | 'NEGATE'
  | 'JOIN-AND'
  | 'JOIN-OR'
  | 'SPLIT'
  | 'BOOL-TRUE'
  | 'BOOL-FALSE'

export type ActionType =
  | 'INSERT'
  | 'REPLACE'
  | 'JOIN-AND'
  | 'JOIN-OR'
  | 'UP-JOIN-AND'
  | 'UP-JOIN-OR'

export type AttributeType = 'enum' | 'numeric' | 'func'

export interface IColumns {
  title: string
  hidden: boolean
}

export interface IGridLayout {
  w: number
  h: number
  x: number
  y: number
  i: string
}
