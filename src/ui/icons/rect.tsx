import { ReactElement } from 'react'

interface Props {
  isFilled?: boolean
}

export const RectSvg = ({ isFilled }: Props): ReactElement => (
  <svg
    width="5"
    height="5"
    viewBox="0 0 5 5"
    fill="none"
    style={{ border: isFilled ? 'none' : '1px solid black' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="5" height="5" fill={isFilled ? 'black' : 'white'} />
  </svg>
)
