import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

interface IUndoRedoButtons {
  onUndo: () => void
  onRedo: () => void
  isUndoDisabled: boolean
  isRedoDisabled: boolean
}

export const UndoRedoButtons = ({
  onUndo,
  onRedo,
  isUndoDisabled,
  isRedoDisabled,
}: IUndoRedoButtons): ReactElement => (
  <div className="flex items-center">
    <div>
      <Button
        variant="secondary"
        icon={<Icon name="Undo" />}
        className="w-8 h-8"
        onClick={onUndo}
        disabled={isUndoDisabled}
      />
    </div>

    <div className="ml-1.5">
      <Button
        variant="secondary"
        icon={<Icon name="Redo" />}
        className="w-8 h-8"
        onClick={onRedo}
        disabled={isRedoDisabled}
      />
    </div>

    <Link className="flex flex-wrap ml-2" to={Routes.Root}>
      <Icon size={15} name="Close" className="text-white cursor-pointer" />
    </Link>
  </div>
)
