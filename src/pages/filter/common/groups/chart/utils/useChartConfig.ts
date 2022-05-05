import { useRef } from 'react'
import isEqual from 'lodash/isEqual'

import { adjustHistogramData } from '@core/histograms'
import {
  AttributeChartRenderModes,
  AttributeKinds,
  HistogramTypes,
  NumericPropertyStatusSubKinds,
  TAttributeRenderMode,
  TNumericPropertyHistogram,
  TPropertyStatus,
  TVariant,
} from '@service-providers/common'
import {
  ChartType,
  TBarChartConfig,
  TChartConfig,
  THistogramChartConfig,
  THistogramChartData,
  TPieChartConfig,
} from '../chart.interface'

const HISTOGRAM_FLOAT_LOG_ZERO = -16

const FLOAT_ROUND_PRECISION = 100

const BAR_CHART_MAX_ITEMS = 40

const floatRound = (num: number): number =>
  Math.round(num * FLOAT_ROUND_PRECISION) / FLOAT_ROUND_PRECISION

const getHistogramChartConfig = (
  histogram: TNumericPropertyHistogram | undefined,
  subKind: NumericPropertyStatusSubKinds | undefined,
): THistogramChartConfig | undefined => {
  if (!histogram || histogram[3].length === 0 || !subKind) {
    return undefined
  }

  const [mode, min, max, values] = histogram

  let data: THistogramChartData

  const isFloat = subKind === NumericPropertyStatusSubKinds.FLOAT

  if (mode === HistogramTypes.LIN) {
    if (!isFloat && max - min + 1 === values.length) {
      data = values.map((value, index) => ({
        value: Math.round(value),
        x0: min + index,
        x1: min + index + 1,
        isPoint: true,
      }))
    } else {
      const interval = (max - min) / values.length

      const round = isFloat ? floatRound : Math.round

      data = values.map((value, index) => ({
        value: Math.round(value),
        x0: round(min + interval * index),
        x1: round(
          index === values.length - 1 ? max : min + interval * (index + 1),
        ),
      }))
    }
  } else {
    let count = values.length
    while (values[count - 1] === 0) {
      count--
    }

    data = []

    const isFloatZero = isFloat && min === HISTOGRAM_FLOAT_LOG_ZERO
    const isIntZero = !isFloat && min < 0
    const firstNonZeroIndex = isFloatZero
      ? values.findIndex((value, index) => index > 0 && value > 0)
      : isIntZero
      ? 1
      : 0

    const minPower = isFloatZero ? min - 1 : min

    if (isFloatZero || isIntZero) {
      data.push({
        isZero: true,
        value: Math.round(values[0]),
        x0: Math.pow(10, minPower + firstNonZeroIndex - 1),
        x1: Math.pow(10, minPower + firstNonZeroIndex),
      })
    }

    for (let i = firstNonZeroIndex; i < count; ++i) {
      data.push({
        value: Math.round(values[i]),
        x0: Math.pow(10, minPower + i),
        x1: Math.pow(10, minPower + i + 1),
      })
    }
  }

  return {
    type: ChartType.Histogram,
    mode,
    data,
  }
}

const getVariantsChartConfig = (
  variants: TVariant[] | undefined,
  renderMode: TAttributeRenderMode | undefined,
): TPieChartConfig | TBarChartConfig | undefined => {
  if (
    !variants ||
    (renderMode !== AttributeChartRenderModes.Bar &&
      renderMode !== AttributeChartRenderModes.Pie &&
      renderMode !== AttributeChartRenderModes.TreeMap)
  ) {
    return undefined
  }

  const sortedVariants = variants
    .filter(variant => variant[1] > 0)
    .sort((firstVariant, secondVariant) => secondVariant[1] - firstVariant[1])

  const type =
    renderMode === AttributeChartRenderModes.Pie ? ChartType.Pie : ChartType.Bar

  if (type === ChartType.Bar) {
    return {
      type,
      data: sortedVariants.slice(0, BAR_CHART_MAX_ITEMS),
      totalItems: sortedVariants.length,
    }
  }

  return {
    type,
    data: sortedVariants,
  }
}

export const useChartConfig = (
  status: TPropertyStatus,
): TChartConfig | undefined => {
  const prevSourceRef = useRef<
    TNumericPropertyHistogram | TVariant[] | undefined
  >()

  const configRef = useRef<TChartConfig>()
  const isNumeric = status.kind === AttributeKinds.NUMERIC

  if (
    !prevSourceRef.current ||
    (isNumeric && !isEqual(prevSourceRef.current, status.histogram)) ||
    (!isNumeric && !isEqual(prevSourceRef.current, status.variants))
  ) {
    if (isNumeric) {
      configRef.current = getHistogramChartConfig(
        // TODO: in the next step we can move `adjustHistogramData` call to service providers adapters
        adjustHistogramData(status.histogram, status.max),
        status['sub-kind'],
      )
    } else {
      configRef.current = getVariantsChartConfig(
        status.variants,
        status['render-mode'],
      )
    }
  }

  prevSourceRef.current = isNumeric ? status.histogram : status.variants

  return configRef.current
}
