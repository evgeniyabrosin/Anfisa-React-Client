import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

type Props = {
  className?: Argument
}

export const ControlPanelDivider = ({ className }: Props): ReactElement => (
  <div
    className={cn('bg-blue-lighter mx-4 rounded-sm w-0.5 h-full', className)}
  />
)
