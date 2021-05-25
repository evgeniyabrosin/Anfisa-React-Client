import { ReactElement } from 'react'

interface Props {
  isFilled?: boolean
}

export const QualityCircleSvg = ({ isFilled }: Props): ReactElement => (
  <svg
    width="5"
    height="5"
    viewBox="0 0 5 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="2.5"
      cy="2.5"
      r="2"
      stroke="black"
      fill={isFilled ? 'black' : 'white'}
    />
  </svg>
)