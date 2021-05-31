import { ReactElement } from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

import { theme } from '@theme'
import { Box } from '@ui/box'
import { Text } from '@ui/text'
import { CellI } from './variant-cell'

const Root = styled(Box)`
  width: 80px;
  padding-right: 15px;
`

const StyledText = styled(Text)`
  word-break: break-all;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${theme('color.black')};
  margin-block-start: 1em;
  margin-block-end: 1em;
`

export const FilterCell = (cell: CellI): ReactElement => {
  const filters = get(cell, 'value', []) as string[]

  return (
    <Root>
      <StyledText>{filters[0]}</StyledText>
    </Root>
  )
}
