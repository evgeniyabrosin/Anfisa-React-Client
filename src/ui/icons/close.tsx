import { ReactElement } from 'react'
import cn from 'classnames'

import { IconProps } from '@icons/interfaces'

export const CloseSvg = ({
  style,
  className,
  onClick,
}: IconProps): ReactElement => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0 fill-current', className)}
      style={style}
      onClick={onClick}
    >
      <path d="M17.6666 2.07903L15.9209 0.333313L8.99992 7.25427L2.07897 0.333313L0.333252 2.07903L7.2542 8.99998L0.333252 15.9209L2.07897 17.6666L8.99992 10.7457L15.9209 17.6666L17.6666 15.9209L10.7456 8.99998L17.6666 2.07903Z" />
    </svg>
  )
}
