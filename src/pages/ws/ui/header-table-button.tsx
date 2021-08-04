import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'

interface Props {
  refEl: any
  text: string
  onClick: () => void
  noIcon?: boolean
  className?: Argument
  specialIcon?: boolean
}

export const HeaderTableButton = ({
  text,
  refEl,
  onClick,
  noIcon,
  className,
  specialIcon,
}: Props) => (
  <div
    ref={refEl}
    onClick={onClick}
    className={cn('flex item-center justify-between cursor-pointer', className)}
  >
    {specialIcon && '+'}

    <p>{text}</p>

    {!noIcon && <Icon name="Filter" />}
  </div>
)
