import { ReactElement } from 'react'
import { CSSProperties } from 'styled-components'

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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 4H1.5V2H14.5V4ZM10.5 9H1.5V7H10.5V9ZM6.5 14H1.5V12H6.5V14Z"
        fill={fill || '#CCCCCC'}
      />
    </svg>
  )
}
