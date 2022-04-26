import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface IHeaderTableButtonProps {
  refEl: any
  text?: string
  onClick: () => void
  noIcon?: boolean
  className?: Argument
  dataTestId?: string
  icon?: ReactElement
}

export const HeaderTableButton = ({
  text,
  refEl,
  onClick,
  className,
  dataTestId,
  icon,
}: IHeaderTableButtonProps) => (
  <div
    ref={refEl}
    onClick={onClick}
    className={cn('flex item-center justify-between cursor-pointer', className)}
    data-testid={dataTestId}
  >
    {icon ? icon : <p>{text}</p>}
  </div>
)
