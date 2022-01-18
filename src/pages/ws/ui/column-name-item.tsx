import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { IColumns } from '@declarations'
import columnsStore from '@store/wsColumns'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'

interface Props {
  name: string
  setColumns: (columns: IColumns[]) => void
  columns: IColumns[]
}

export const ColumnNameItem = observer(
  ({ name, setColumns, columns }: Props): ReactElement => {
    const handleHiddenClick = () => {
      const newColumns = columns.map(col => {
        if (col.title === name) {
          col.hidden = !col.hidden
        }

        return col
      })

      columnsStore.setColumns(newColumns)
      setColumns(newColumns)
    }

    const isChecked = () => {
      const columnItem = columns.find(col => col.title === name)

      return !!columnItem && !columnItem.hidden
    }

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="Dnd" />
          <span className="text-12 my-1">{name}</span>
        </div>

        <Switch onChange={handleHiddenClick} isChecked={isChecked()} />
      </div>
    )
  },
)
