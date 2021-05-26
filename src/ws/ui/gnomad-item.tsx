import { Fragment, ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Text } from '@ui/text'

interface Props {
  name: string
  value?: string[]
}

const Root = styled(Box)`
  display: flex;
  align-items: center;
`

const StyledName = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin: 0px;
`

const StyledValue = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin: 0px;
  margin-left: 5px;
`

export const GnomadItem = ({ name, value }: Props): ReactElement => {
  if (!value) {
    return <Fragment />
  }

  return (
    <Root>
      <StyledName>{`${name}:`}</StyledName>
      <StyledValue>{Number(value).toFixed(5)}</StyledValue>
    </Root>
  )
}
