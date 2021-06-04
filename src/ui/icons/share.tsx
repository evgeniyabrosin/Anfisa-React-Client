import { ReactElement } from 'react'
import { CSSProperties } from 'styled-components'

interface Props {
  style?: CSSProperties
  fill?: string
  onClick?: () => void
}

export const ShareSvg = ({ style, fill, onClick }: Props): ReactElement => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      onClick={onClick}
    >
      <path
        d="M11.3339 13.3333H4.00057C3.26419 13.3333 2.66724 12.7364 2.66724 12V4.66666C2.66724 3.93028 3.26419 3.33333 4.00057 3.33333H6.66724V4.66666H4.00057V12H11.3339V9.33333H12.6672V12C12.6672 12.7364 12.0703 13.3333 11.3339 13.3333ZM7.80057 9.138L6.86057 8.19533L11.0559 4H8.66723V2.66666H13.3339V7.33333H12.0006V4.94333L7.80057 9.138Z"
        fill={fill}
      />
    </svg>
  )
}
