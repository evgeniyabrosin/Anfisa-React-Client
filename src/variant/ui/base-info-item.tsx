import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Text } from '@ui/text'

interface Props {
  name: string
  value: string
}

const Root = styled(Box)`
  display: flex;
  align-items: center;
`

const StyledFieldName = styled(Text)`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #000000;
  margin: 5px 0px;
`

const StyledFieldValue = styled(Text)`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #0c65fd;
  margin: 5px 0px 5px 24px;
`

export const BaseInfoItem = ({ name, value }: Props): ReactElement => {
  return (
    <Root>
      <StyledFieldName>{`${name}:`}</StyledFieldName>
      <StyledFieldValue>{value}</StyledFieldValue>
    </Root>
  )
}
