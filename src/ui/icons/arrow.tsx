import { CSSProperties, ReactElement } from 'react'

interface Props {
  fill?: string
  style?: CSSProperties
}

export const ArrowSvg = ({ fill, style }: Props): ReactElement => {
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
        d="M10 4L6 8L10 12"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={fill}
      />
    </svg>
  )
}
