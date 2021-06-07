import { CSSProperties, ReactElement } from 'react'

interface Props {
  style?: CSSProperties
}

export const ExportSvg = ({ style }: Props): ReactElement => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M5.375 7.37573L8 10L10.625 7.37573"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3V9.99816"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 10V13.5C13.5 13.6326 13.4473 13.7598 13.3536 13.8536C13.2598 13.9473 13.1326 14 13 14H3C2.86739 14 2.74021 13.9473 2.64645 13.8536C2.55268 13.7598 2.5 13.6326 2.5 13.5V10"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
