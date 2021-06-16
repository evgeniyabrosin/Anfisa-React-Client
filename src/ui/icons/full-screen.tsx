import { ReactElement } from 'react'
import cn from 'classnames'

import { IconProps } from '@icons/interfaces'

export const FullScreenSvg = ({
  className,
  onClick,
}: IconProps): ReactElement => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      onClick={onClick}
    >
      <path
        d="M13.125 4.25H16.25V7.375"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 16.75H3.75V13.625"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 13.625V16.75H13.125"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 7.375V4.25H6.875"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
