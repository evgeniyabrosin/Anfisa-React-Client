import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

type Props = {
  className?: Argument
}

export const ControlPanelDivider = ({ className }: Props): ReactElement => (
  <div
    className={cn('h-3/4 bg-blue-lighter mx-4 rounded-sm w-0.5', className)}
  />
)
