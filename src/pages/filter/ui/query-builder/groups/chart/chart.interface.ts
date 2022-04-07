import { HistogramTypes, TVariant } from '@service-providers/common'

export enum ChartType {
  Pie = 'pie',
  Bar = 'bar',
  Histogram = 'histogram',
}

export type TBarChartData = TVariant[]

export type TPieChartData = TVariant[]

export type THistogramChartDataItem = {
  value: number
  x0: number
  x1: number
  isZero?: boolean
  isPoint?: boolean
}

export type THistogramChartData = THistogramChartDataItem[]

export type TBaseChartConfig<Type extends ChartType, Data> = {
  type: Type
  data: Data
}

export type TPieChartConfig = TBaseChartConfig<ChartType.Pie, TPieChartData>
export type TBarChartConfig = TBaseChartConfig<ChartType.Bar, TBarChartData>
export type THistogramChartConfig = TBaseChartConfig<
  ChartType.Histogram,
  THistogramChartData
> & {
  mode: HistogramTypes
}

export type TChartConfig =
  | TPieChartConfig
  | TBarChartConfig
  | THistogramChartConfig
