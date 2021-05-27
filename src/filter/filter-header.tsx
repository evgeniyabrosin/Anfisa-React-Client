import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { useParams } from '@core/hooks/use-params'
import { Box } from '@ui/box'
import { CloseSvg } from '@icons/close'
import { Text } from '@ui/text'
import { FilterControl } from './ui/filter-control'

const Root = styled(Box)`
  background-color: #f0f0f0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  const history = useHistory()

  const handleClose = () => history.goBack()

  return (
    <Root>
      <StyledText>{params.get('ds')}</StyledText>

      <CloseSvg onClick={handleClose} style={{ cursor: 'pointer' }} />

      <FilterControl />
    </Root>
  )
}
