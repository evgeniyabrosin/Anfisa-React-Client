import {
  AttributeKinds,
  TFilteringStatCounts,
  TPropertyStatus,
} from '@service-providers/common'
import { TPredictionPower, TQueryBuilder } from './query-builder.interfaces'

const enum TotalVariantGroups {
  EasyToSelect = 10,
  OnOnePage = 25,
  EasyToScroll = 125,
  PossibleToScroll = 625,
  DifficultToScroll = 3125,
}

const reduceTotal = (total: number): number => {
  if (total < TotalVariantGroups.EasyToSelect) {
    return 0.3 + 0.02 * total
  }

  if (total < TotalVariantGroups.OnOnePage) {
    return 0.5 + (total - TotalVariantGroups.EasyToSelect) / 15
  }

  if (total < TotalVariantGroups.EasyToScroll) {
    return 2 + Math.sqrt(total - TotalVariantGroups.OnOnePage) / 5
  }

  if (total < TotalVariantGroups.PossibleToScroll) {
    return 4 + (total - TotalVariantGroups.EasyToScroll) / 100
  }

  if (total < TotalVariantGroups.DifficultToScroll) {
    return 9 + (total - TotalVariantGroups.PossibleToScroll) / 200
  }

  // visual selection
  return 21.5
}

export const getPredictionPower = (
  attr: TPropertyStatus,
  filteredCount: number,
): TPredictionPower | undefined => {
  const { kind, detailed: isDetailed } = attr
  let counts: number[] | undefined

  if (
    (kind === AttributeKinds.ENUM || kind === AttributeKinds.FUNC) &&
    attr.variants
  ) {
    counts = attr.variants.map(variant => variant[isDetailed ? 2 : 1] ?? 0)
  } else if (kind === AttributeKinds.NUMERIC && attr.histogram) {
    counts = attr.histogram[3]
  }

  if (!counts) {
    return undefined
  }

  let count = 0
  let total: number = counts.reduce((acc, value) => acc + value)

  if (total < filteredCount) {
    counts.push(filteredCount - total)
    total = filteredCount
  }

  if (total < 3) {
    return {
      value: -1,
      comment: `E=0! T=${total}`,
    }
  }

  let sumE = 0
  for (const value of counts) {
    if (!value) {
      continue
    }

    count++
    const quote = value / total
    sumE -= quote * Math.log2(quote)
  }

  const normE = sumE / Math.log2(total)
  const divisor = reduceTotal(count)
  const predictionPower = normE / divisor

  return {
    value: Math.min(1.0, predictionPower),
    comment: [
      `E=${normE.toFixed(3)}`,
      `T=${total}`,
      `C=${count}`,
      `D=${divisor.toFixed(3)}`,
      `L=${counts.length}`,
    ].join(' '),
  }
}

export const getQueryBuilder = (
  attributes: TPropertyStatus[],
  filteredCounts: TFilteringStatCounts,
): TQueryBuilder => {
  const queryBuilder: TQueryBuilder = []

  for (const attr of attributes) {
    const { vgroup } = attr
    let unitGroup = queryBuilder.find(group => group.name === vgroup)

    if (!unitGroup) {
      unitGroup = { name: vgroup, attributes: [] }
      queryBuilder.push(unitGroup)
    }

    unitGroup.attributes.push({
      ...attr,
      power: getPredictionPower(
        attr,
        attr.detailed
          ? filteredCounts.transcribedVariants
          : filteredCounts.variants,
      ),
    })
  }

  for (const group of queryBuilder) {
    group.power = group.attributes.reduce<number | undefined>(
      (acc, { power }) =>
        power && (acc === undefined || power.value > acc) ? power.value : acc,
      undefined,
    )
  }

  return queryBuilder
}
