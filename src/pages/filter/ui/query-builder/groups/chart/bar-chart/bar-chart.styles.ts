import styled from 'styled-components'

import { theme } from '@theme'

export const tickColor = theme('colors.grey.blue')
export const barColor = theme('colors.blue.bright')
export const gridColor = theme('colors.blue.lighter')

export const BarChartSvg = styled.svg`
  .tick {
    color: ${tickColor};
    font: normal 9px Roboto, sans-serif;

    line {
      color: ${gridColor};
    }
  }
`
