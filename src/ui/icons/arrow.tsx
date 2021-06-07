import { CSSProperties, ReactElement } from 'react'

interface Props {
  fill?: string
  style?: CSSProperties
  direction?: 'top' | 'right' | 'down' | 'left'
}

const transform = {
  top: 'rotate(90deg)',
  right: 'rotate(180deg)',
  down: 'rotate(270deg)',
  left: '',
}

export const ArrowSvg = ({
  fill,
  style,
  direction = 'left',
}: Props): ReactElement => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, transform: transform[direction] }}
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
