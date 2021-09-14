import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
        fill="#E7F4FF"
      />
      <path
        d="M15 14L9 10L15 6"
        stroke="#18A0FB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17H16"
        stroke="#18A0FB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
