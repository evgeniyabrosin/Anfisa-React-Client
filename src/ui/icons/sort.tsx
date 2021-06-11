import { ReactElement } from 'react'
import cn from 'classnames'

import { IconProps } from '@icons/interfaces'

export const SortSvg = ({ className }: IconProps): ReactElement => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0 stroke-current', className)}
    >
      <path d="M4 8H12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 5H14.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 11H9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
