import { ReactElement } from 'react'

import { theme } from '@theme'

interface Props {
  fill?: string
  onClick?: () => void
}

export const FullScreenSvg = ({ fill, onClick }: Props): ReactElement => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer flex-shrink-0"
      onClick={onClick}
    >
      <path
        d="M13.125 4.25H16.25V7.375"
        stroke={fill || theme('colors.grey.blue')}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 16.75H3.75V13.625"
        stroke={fill || theme('colors.grey.blue')}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 13.625V16.75H13.125"
        stroke={fill || theme('colors.grey.blue')}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 7.375V4.25H6.875"
        stroke={fill || theme('colors.grey.blue')}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
