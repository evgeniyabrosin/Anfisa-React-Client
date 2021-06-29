import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import columnsStore from '@store/wsColumns'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'

interface Props {
  name: string
}

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
          <span className="text-12 my-1">{name}</span>
        </div>

        <Switch
          onChange={handleChange}
          isChecked={columnsStore.columns.includes(name)}
        />
      </div>
    )
  },
)
