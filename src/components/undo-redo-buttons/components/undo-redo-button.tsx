import { FC, MouseEvent } from 'react'
import cn, { Argument } from 'classnames'

interface IUndoRedoButtonProps {
  className?: Argument
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export const UndoRedoButton: FC<IUndoRedoButtonProps> = ({
  className,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-full w-8 h-8 flex items-center justify-center border-blue-bright border-2',
        className,
      )}
    >
      {children}
    </button>
  )
}
