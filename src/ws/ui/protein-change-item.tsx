import { ReactElement } from 'react'
import styled from 'styled-components'

import { Text } from '@ui/text'

interface Props {
  value: string
}

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  color: #000000;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ProteinChangeItem = ({ value }: Props): ReactElement => {
  return <StyledText>{value}</StyledText>
}
