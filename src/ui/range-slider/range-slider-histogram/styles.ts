import styled from 'styled-components'

import { theme } from '@theme'

export const RangeSliderHistogramRoot = styled.div`
  position: relative;
`

export const RangeSliderHistogramAxisLabel = styled.span`
  position: absolute;
  right: 100%;
  padding-right: 4px;
  margin-top: -5px;
  font-size: 10px;
  line-height: 10px;
  color: ${theme('color.grey.blue')};
`
