import { ReactElement } from 'react'
import { CSSProperties } from 'styled-components'

interface Props {
  style?: CSSProperties
}

export const PlusSvg = ({ style }: Props): ReactElement => {
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
        d="M8.66659 8.66666V12.6667H7.33325V8.66666H3.33325V7.33333H7.33325V3.33333H8.66659V7.33333H12.6666V8.66666H8.66659Z"
        fill="#2E3A59"
      />
    </svg>
  )
}
