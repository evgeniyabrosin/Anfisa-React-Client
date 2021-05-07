interface ColorMapI {
  [key: string]: string
}

const colorMap: ColorMapI = {
  10: '#2FA84F',
  20: 'yellow',
  30: 'rgb(234, 225, 47)',
}

export const getVariantColor = (value: number | string): string => {
  return colorMap[value] || ''
}
