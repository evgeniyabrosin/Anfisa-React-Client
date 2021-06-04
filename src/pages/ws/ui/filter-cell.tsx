import { ReactElement } from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

import { theme } from '@theme'
import { Text } from '@ui/text'
import { CellI } from './variant-cell'

const StyledText = styled(Text)`
  word-break: break-all;
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
    <div>
      <StyledText>{filters[0]}</StyledText>
    </div>
  )
}
