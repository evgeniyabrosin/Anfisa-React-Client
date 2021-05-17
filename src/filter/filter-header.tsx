import { ReactElement } from 'react'
import styled from 'styled-components'

import { useParams } from '../core/hooks/use-params'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { FilterControl } from './ui/filter-control'

const Root = styled(Box)`
  background-color: #f0f0f0;
  height: 124px;
  padding: 27px 24px 16px 24px;
`

const StyledText = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
  margin: 0px;
`

export const FilterHeader = (): ReactElement => {
  const params = useParams()

  return (
    <Root>
      <StyledText>{params.get('ds')}</StyledText>

      <FilterControl />
    </Root>
  )
}
