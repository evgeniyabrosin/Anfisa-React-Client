import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { DndSvg } from '../../ui/icons/dnd'
import { Switch } from '../../ui/switch'
import { Text } from '../../ui/text'

interface Props {
  name: string
}

const Root = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  color: #595959;
  margin-left: 10px;
  margin-top: 4px;
  margin-bottom: 4px;
`

export const ColumnNameItem = ({ name }: Props): ReactElement => (
  <Root>
    <Wrapper>
      <DndSvg />
      <StyledText>{name}</StyledText>
    </Wrapper>

    <Switch onChange={() => null} isChecked={false} />
  </Root>
)
