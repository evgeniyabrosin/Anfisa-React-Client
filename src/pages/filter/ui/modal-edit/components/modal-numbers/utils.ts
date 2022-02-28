import { StatList } from '@declarations'
import {
  IRangeSliderProps,
  RangeSliderColor,
  RangeSliderScale,
  RangeSliderSide,
} from '@ui/range-slider'

export const getRangeSliderProps = (
  attrData: StatList,
): Pick<
  IRangeSliderProps,
  'min' | 'max' | 'step' | 'scale' | 'color' | 'histogram'
> => {
  const {
    min,
    max,
    ['sub-kind']: subKind,
    ['render-mode']: renderMode,
  } = attrData

  const isFloat = subKind === 'float'
  const isLogarithmic = renderMode?.startsWith('log') ?? false

  let histogram: number[] | undefined
  let step = isFloat ? 0.001 : 1

  if (attrData.histogram) {
    const histogramData = attrData.histogram[3]

    if (isLogarithmic) {
      histogram = []
      let needSetFloatStep = isFloat
      let i = 0
      const histogramMin = isFloat ? -16 : -1

      while (
        Math.pow(10, i + histogramMin) <= max &&
        i < histogramData.length
      ) {
        const value = histogramData[i]

        if (needSetFloatStep && i > 0 && value > 0) {
          needSetFloatStep = false
          step = Math.pow(10, i - 17)
        }

        if (i === 0 || !needSetFloatStep) {
          histogram.push(value)
        }

        ++i
      }
    } else {
      histogram = histogramData
    }
  }

  return {
    min,
    max,
    step,
    scale: isLogarithmic
      ? RangeSliderScale.Logarithmic
      : RangeSliderScale.Linear,
    color: isLogarithmic
      ? RangeSliderColor.Secondary
      : RangeSliderColor.Primary,
    histogram,
  }
}

export const getRangeSliderStrongSide = (
  leftDropType: boolean,
  rightDropType: boolean,
): RangeSliderSide => {
  if (!leftDropType && !rightDropType) {
    return RangeSliderSide.Both
  }

  if (!leftDropType) {
    return RangeSliderSide.Left
  }

  if (!rightDropType) {
    return RangeSliderSide.Right
  }

  return RangeSliderSide.None
}

export const getNumericValue = (
  value: string | number | null | undefined,
): number | null => (value != null && value !== '' ? +value : null)
