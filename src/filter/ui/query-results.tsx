import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { Text } from '../../ui/text'

const Root = styled(Box)`
  display: flex;
  align-items: center;
`

const NoResultsText = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #6c6c6c;
  margin-left: auto;
  margin-right: auto;
`

export const QueryResults = (): ReactElement => {
  return (
    <Root>
      <NoResultsText>Query returned no results</NoResultsText>
    </Root>
  )
}
