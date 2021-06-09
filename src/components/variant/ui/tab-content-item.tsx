import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Text } from '@ui/text'

export interface TabContentItemI {
  name: string
  value: string
}

const Root = styled(Box)`
  display: flex;
  margin-bottom: 10px;
`

const StyledName = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #000000;
  margin: 0px;
`

const StyledValue = styled(Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #0c65fd;
  margin: 0px;
  margin-left: 5px;
`

export const TabContentItem = ({
  name,
  value,
}: TabContentItemI): ReactElement => {
  return (
    <Root>
      <StyledName>{name}</StyledName>
      <StyledValue>{value}</StyledValue>
    </Root>
  )
}
