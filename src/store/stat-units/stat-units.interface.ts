import {
  IEnumPropertyStatus,
  IFuncPropertyStatus,
  INumericPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'

export type TPredictionPower = {
  value: number
  comment: string
}

export type TStatusWithPredictionPower<Status extends TPropertyStatus> =
  Status & {
    power: TPredictionPower | undefined
  }

export type TUnit =
  | TStatusWithPredictionPower<INumericPropertyStatus>
  | TStatusWithPredictionPower<IEnumPropertyStatus>

export type TUnitGroup = {
  name: string
  units: TUnit[]
  power?: number
}

export type TUnitGroups = TUnitGroup[]

export type TFunctionalUnit = IFuncPropertyStatus
