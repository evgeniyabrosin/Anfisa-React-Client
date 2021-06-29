import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import columnsStore from '@store/wsColumns'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'
import { Text } from '@ui/text'

interface Props {
  name: string
}

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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="Dnd" />
          <StyledText>{name}</StyledText>
        </div>

        <Switch
          onChange={handleChange}
          isChecked={columnsStore.columns.includes(name)}
        />
      </div>
    )
  },
)
