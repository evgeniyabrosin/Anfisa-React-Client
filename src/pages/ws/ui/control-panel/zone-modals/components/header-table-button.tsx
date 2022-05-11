import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface IHeaderTableButtonProps {
  refEl: any
  text?: string
  onClick: () => void
  onMouseUp: () => void
  noIcon?: boolean
  className?: Argument
  dataTestId?: string
  icon?: ReactElement
}

export const HeaderTableButton = ({
  text,
  refEl,
  onClick,
  onMouseUp,
  className,
  dataTestId,
  icon,
}: IHeaderTableButtonProps) => (
  <div
    ref={refEl}
    onClick={onClick}
    onMouseUp={onMouseUp}
    className={cn('flex item-center justify-between cursor-pointer', className)}
    data-testid={dataTestId}
  >
    {icon ? icon : <p>{text}</p>}
  </div>
)
