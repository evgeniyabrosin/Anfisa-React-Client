import { TPropertyStatus } from '@service-providers/common'

export type TPredictionPower = {
  value: number
  comment: string
}

export type TStatusWithPredictionPower<Status extends TPropertyStatus> =
  Status & {
    power: TPredictionPower
  }

export type TQueryBuilderAttribute = TPropertyStatus & {
  power?: TPredictionPower
}

export type TQueryBuilderGroup = {
  name: string
  attributes: TQueryBuilderAttribute[]
  power?: number
}

export type TQueryBuilder = TQueryBuilderGroup[]
