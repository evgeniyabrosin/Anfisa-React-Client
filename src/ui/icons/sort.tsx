import { ReactElement } from 'react'
import { CSSProperties } from 'styled-components'

import { theme } from '@theme'

interface Props {
  style?: CSSProperties
  fill?: string
}

export const SortSvg = ({ style, fill }: Props): ReactElement => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M4 8H12"
        stroke={fill || theme('colors.grey.blue')}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 5H14.5"
        stroke={fill || theme('colors.grey.blue')}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 11H9.5"
        stroke={fill || theme('colors.grey.blue')}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
