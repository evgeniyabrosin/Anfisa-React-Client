import { Fragment } from 'react'

const size = 12

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <g opacity="0.6">
        <path d="M3 3L9 9" stroke="white" strokeLinecap="round" />
        <path d="M9 3L3 9" stroke="white" strokeLinecap="round" />
      </g>
    </Fragment>
  ),
}
