import styled from 'styled-components'

import { theme } from '@theme'

export const tickColor = theme('colors.grey.blue')
export const barColor = theme('colors.blue.bright')
export const logBarColor = theme('colors.purple.bright')
export const gridColor = theme('colors.blue.lighter')

export const HistogramChartSvg = styled.svg`
  .tick {
    color: ${tickColor};
    font: normal 9px Roboto, sans-serif;
  }

  .tick.hide {
    text {
      display: none;
    }
  }

  .y-axis {
    .domain {
      display: none;
    }

    .tick {
      line {
        color: ${gridColor};
      }
    }
  }

  .x-axis {
    .domain {
      display: none;
    }
  }
`
