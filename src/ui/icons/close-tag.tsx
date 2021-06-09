import { ReactElement } from 'react'

interface Props {
  onClick?: () => void
}

export const CloseTagSvg = ({ onClick }: Props): ReactElement => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="ml-1"
      cursor="pointer"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.6">
        <path d="M3 3L9 9" stroke="white" strokeLinecap="round" />
        <path d="M9 3L3 9" stroke="white" strokeLinecap="round" />
      </g>
    </svg>
  )
}
