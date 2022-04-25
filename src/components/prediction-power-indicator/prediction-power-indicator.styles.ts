import styled from 'styled-components'

import { theme } from '@theme'

const getSize = (size: 'sm' | 'md'): number => (size === 'sm' ? 6 : 8)

const colors = [theme('colors.grey.blue'), '#fde66b', '#98e18b', '#19af00']

export const getColorByValue = (value: number): number => {
  if (value <= 0.01) {
    return 0
  }

  if (value <= 0.1) {
    return 1
  }

  if (value <= 0.2) {
    return 2
  }

  return 3
}

export const PredictionPowerPoint = styled.span<{
  size: 'sm' | 'md'
  colorIndex: number
}>`
  display: inline-block;
  vertical-align: middle;
  line-height: 0;
  overflow: hidden;
  border-radius: 4px;

  width: ${props => getSize(props.size)}px;
  height: ${props => getSize(props.size)}px;
  background-color: ${props => colors[props.colorIndex]};
`
