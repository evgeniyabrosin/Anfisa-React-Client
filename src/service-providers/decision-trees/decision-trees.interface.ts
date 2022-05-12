import {
  DatasetKinds,
  ISolutionEntryDescription,
  TCondition,
  TFilteringStat,
  TItemsCount,
  TPropertyStatus,
} from '../common'
import { TGetFullStatUnitsOptions } from '../filtering-regime'

// dtree_set

export enum DtreeModifyingActions {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type TDtreeModifyingActions = [
  actionType: 'DTREE',
  actionName: DtreeModifyingActions,
  decisionTreeName: string,
]

export enum InstrModifyingActionNames {
  DUPLICATE = 'DUPLICATE',
  DELETE = 'DELETE',
  NEGATE = 'NEGATE',
  JOIN_AND = 'JOIN-AND',
  JOIN_OR = 'JOIN-OR',
  UP_JOIN_AND = 'UP-JOIN-AND',
  UP_JOIN_OR = 'UP-JOIN-OR',
  SPLIT = 'SPLIT',
  BOOL_TRUE = 'BOOL-TRUE',
  BOOL_FALSE = 'BOOL-FALSE',
  LABEL = 'LABEL',
  COMMENTS = 'COMMENTS',
}

export type TInstrModifyingActions = [
  actionType: 'INSTR',
  actionName: InstrModifyingActionNames,
  pointNo: number,
  additionalOption: unknown,
]

export enum PointModyfingActionNames {
  INSERT = 'INSERT',
  REPLACE = 'REPLACE',
  JOIN_AND = 'JOIN-AND',
  JOIN_OR = 'JOIN-OR',
}

export type TPointModifyingActions = [
  actionType: 'POINT',
  actionName: PointModyfingActionNames,
  pointNo: number,
  condition: TCondition,
]

export enum AtomModifyingActionName {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export type TAtomModifyingActions = [
  actionType: 'ATOM',
  actionName: AtomModifyingActionName,
  atomLocation: [pointNo: number, atomNoInPointAtomList: number],
  additionalArgument?: unknown,
]

export type TModifyingAction =
  | TDtreeModifyingActions
  | TInstrModifyingActions
  | TPointModifyingActions
  | TAtomModifyingActions

export interface IDtreeSetArguments {
  ds: string
  tm?: string
  dtree?: string
  code?: string
  instr: TModifyingAction
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

export type PointCount = TItemsCount | null

export interface IDtreeSet {
  kind: DatasetKinds
  'total-counts': TItemsCount[]
  'point-counts': PointCount[]
  code: string
  points: IDtreeSetPoint[]
  'cond-atoms': Record<string, TCondition[]>
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
  tm?: number
  dtree?: string
  code?: string
  no?: string
}

export interface IDtreeStatResponse {
  'total-counts': TItemsCount
  'filtered-counts': TItemsCount
  'stat-list': TPropertyStatus[]
  'rq-id': string
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

export type TDtreeStat = TFilteringStat

export type TGetFullDtreeStatParams = {
  ds: string
  no: string
  code: string
}

export type TGetFullDtreeStatOptions = TGetFullStatUnitsOptions<TDtreeStat>
