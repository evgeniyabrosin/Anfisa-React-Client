import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { IColumns } from '@declarations'
import columnsStore from '@store/wsColumns'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'

interface Props {
  name: string
  setColumns: (columns: IColumns[]) => void
  index: number
  columns: IColumns[]
}

export const ColumnNameItem = observer(
  ({ name, setColumns, index, columns }: Props): ReactElement => {
    const handleHiddenClick = () => {
      const copy = JSON.parse(JSON.stringify(columns))

      copy[index].hidden = !copy[index].hidden
      columnsStore.setColumns(copy)
      setColumns(copy)
    }

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="Dnd" />
          <span className="text-12 my-1">{name}</span>
        </div>

        <Switch
          onChange={handleHiddenClick}
          isChecked={!columns[index].hidden}
        />
      </div>
    )
  },
)
