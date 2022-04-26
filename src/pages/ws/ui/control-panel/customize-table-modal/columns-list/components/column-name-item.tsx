import { ReactElement } from 'react'

import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'

interface IColumnNameItemProps {
  name: string
  isChecked: boolean
  onClickSwitch: () => void
}

export const ColumnNameItem = ({
  name,
  onClickSwitch,
  isChecked,
}: IColumnNameItemProps): ReactElement => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon name="Dnd" />
        <span className="text-12 my-1">{name}</span>
      </div>

      <Switch onChange={onClickSwitch} isChecked={isChecked} />
    </div>
  )
}
