import { CSSProperties, ReactElement } from 'react'

interface Props {
  fill?: string
  style?: CSSProperties
}

export const CircleSvg = ({ fill, style }: Props): ReactElement => {
  return (
    <svg
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill={fill} />
    </svg>
  )
}
