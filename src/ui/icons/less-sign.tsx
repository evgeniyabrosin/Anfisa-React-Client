import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path
        d="M7 9L1 5L7 1"
        stroke="#18A0FB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
