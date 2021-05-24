import get from 'lodash/get'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { theme } from '../../theme'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { CellI } from './variant-cell'

const Root = styled(Box)`
  width: 150px;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${theme('colors.black')};
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const HG19Cell = ({ cell }: CellI): ReactElement => {
  const value = get(cell, 'value', '').split(' ')

  return (
    <Root>
      <StyledText>{value[0]}</StyledText>
      <StyledText>{value[1]}</StyledText>
    </Root>
  )
}
