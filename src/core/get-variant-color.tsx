import { theme } from '@theme'

interface ColorMapI {
  [key: string]: string
}

const colorMap: ColorMapI = {
  10: theme('colors.green.secondary'),
  20: theme('colors.yellow.bright'),
  30: theme('colors.yellow.dirty'),
}

const colorClass: ColorMapI = {
  10: 'text-green-secondary',
  20: 'text-yellow-bright',
  30: 'text-yellow-dirty',
}

export const getVariantColor = (value: number | string): string => {
  return colorMap[value] || ''
}

export const getVariantClass = (value: number | string): string => {
  return colorClass[value] || ''
}
