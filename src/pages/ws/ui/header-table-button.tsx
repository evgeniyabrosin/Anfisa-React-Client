import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'

interface Props {
  refEl: any
  text: string
  onClick: () => void
  noIcon?: boolean
  className?: Argument
  specialIcon?: boolean
  dataTestId?: string
}

export const HeaderTableButton = ({
  text,
  refEl,
  onClick,
  noIcon,
  className,
  specialIcon,
  dataTestId,
}: Props) => (
  <div
    ref={refEl}
    onClick={onClick}
    className={cn('flex item-center justify-between cursor-pointer', className)}
    data-testid={dataTestId}
  >
    {specialIcon && '+'}

    <p>{text}</p>

    {!noIcon && <Icon name="Filter" />}
  </div>
)
