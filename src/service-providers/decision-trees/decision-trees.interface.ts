import {
  DatasetKinds,
  ISolutionEntryDescription,
  TCondition,
  TCount,
  TPropertyStatus,
} from 'service-providers/common/common.interface'

// dtree_set

export enum DtreeModyfyingActions {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type TDtreeModyfyingActions = [
  actionType: 'DTREE',
  actionName: DtreeModyfyingActions,
  decisionTreeName: string,
]

export enum InstrModyfingActionNames {
  DUPLICATE = 'DUPLICATE',
  DELETE = 'DELETE',
  NEGATE = 'NEGATE',
  JOIN_AND = 'JOIN-AND',
  JOIN_OR = 'JOIN-OR',
  SPLIT = 'SPLIT',
  BOOL_TRUE = 'BOOL-TRUE',
  BOOL_FALSE = 'BOOL-FALSE',
  LABEL = 'LABEL',
  COMMENTS = 'COMMENTS',
}

export type TInstrModyfingActions = [
  actionType: 'INSTR',
  actionName: InstrModyfingActionNames,
  pointNo: number,
  additionalOption: unknown,
]

export enum PointModyfingActionNames {
  INSERT = 'INSERT',
  REPLACE = 'REPLACE',
  JOIN_AND = 'JOIN-AND',
  JOIN_OR = 'JOIN-OR',
}

export type TPointModyfingActions = [
  actionType: 'POINT',
  actionName: PointModyfingActionNames,
  pointNo: number,
  condition: TCondition,
]

export enum AtomModyfingActionName {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export type TAtomModyfingActions = [
  actionType: 'ATOM',
  actionName: AtomModyfingActionName,
  atomLocation: [pointNo: number, atomNoInPointAtomList: number],
  additionalArgument?: unknown,
]

export type TModyfyingAction =
  | TDtreeModyfyingActions
  | TInstrModyfingActions
  | TPointModyfingActions
  | TAtomModyfingActions

export interface IDtreeSetArguments {
  ds: string
  tm?: string
  dtree?: string
  code?: string
  instr: TModyfyingAction
}

export enum DtreeSetPointKinds {
  IF = 'If',
  RETURN = 'Return',
  EMPTY = '',
  LABEL = 'Label',
  ERROR = 'Error',
}

export interface IDtreeSetPoint {
  kind: DtreeSetPointKinds
  level: 0 | 1
  decision: boolean | null
  'code-frag': string
  actions: string[]
}

export type PointCount = TCount | null

export interface IDtreeSet {
  kind: DatasetKinds
  'total-counts': TCount[]
  'point-counts': PointCount[]
  code: string
  points: IDtreeSetPoint[]
  'cond-atoms': {
    [pointNumber: number]: TCondition[]
  }
  labels: string[]
  error?: string
  line?: number
  pos?: number
  'dtree-name'?: string
  'eval-status': 'ok' | string
  hash: string
  'dtree-list': ISolutionEntryDescription[]
  rq_id: string
}

// dtree_counts

export interface IDtreeCountsArguments {
  ds: string
  tm?: string
  rq_id: string
  dtree?: string
  code?: string
  points: number[]
}

export interface IDtreeCounts {
  'rq-id': string
  'point-counts': PointCount[]
}

// dtree_stat

export interface IDtreeStatArguments {
  ds: string
  tm?: string
  dtree?: string
  code?: string
  no?: string
}

export interface IDtreeStat {
  'total-counts': TCount[]
  'filtered-counts': TCount[]
  'stat-list': TPropertyStatus[]
  rq_id: string
}

// dtree_check

export interface IDtreeCheckArguments {
  ds: string
  code: string
}

export interface IDtreeCheck {
  code: string
  error?: string
  line?: number
  pos?: number
}

// dtree_cmp

export interface IDtreeCmpArguments {
  ds: string
  dtree?: string
  code?: string
  other: string
}

export interface IDtreeCmp {
  cmp: string[][]
}
