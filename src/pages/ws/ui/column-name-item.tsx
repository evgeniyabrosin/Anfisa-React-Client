import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import columnsStore from '@store/wsColumns'
import { Box } from '@ui/box'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'
import { Text } from '@ui/text'
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
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  color: #595959;
  margin-left: 10px;
  margin-top: 4px;
  margin-bottom: 4px;
`

export const ColumnNameItem = observer(
  ({ name }: Props): ReactElement => {
    const handleChange = (checked: boolean) => {
      if (!checked) {
        columnsStore.removeColumn(name)
      }

      if (checked) {
        columnsStore.addColumn(name)
      }
    }

    return (
      <Root>
        <Wrapper>
          <Icon name="Dnd" />
          <StyledText>{name}</StyledText>
        </Wrapper>

        <Switch
          onChange={handleChange}
          isChecked={columnsStore.columns.includes(name)}
        />
      </Root>
    )
  },
)
