import { Fragment } from 'react'

const size = 24

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M4 4L20 20" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 4L4 20" strokeWidth="2" strokeLinecap="round" />
    </Fragment>
  ),
}
