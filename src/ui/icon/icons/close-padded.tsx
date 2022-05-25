import { Fragment } from 'react'

const size = 12

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M3 3L9 9" strokeLinecap="round" />
      <path d="M9 3L3 9" strokeLinecap="round" />
    </Fragment>
  ),
}
