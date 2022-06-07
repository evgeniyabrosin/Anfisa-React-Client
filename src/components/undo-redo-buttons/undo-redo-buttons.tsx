import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Routes } from '@router/routes.enum'
import { Icon } from '@ui/icon'
import { UndoRedoButton } from '@components/undo-redo-buttons/components/undo-redo-button'

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
    <UndoRedoButton onClick={onUndo} disabled={isUndoDisabled}>
      <Icon name="Undo" />
    </UndoRedoButton>

    <UndoRedoButton onClick={onRedo} disabled={isRedoDisabled} className="ml-2">
      <Icon name="Redo" />
    </UndoRedoButton>

    <Link className="flex flex-wrap ml-3" to={Routes.Root}>
      <Icon size={15} name="Close" className="text-white cursor-pointer" />
    </Link>
  </div>
)
