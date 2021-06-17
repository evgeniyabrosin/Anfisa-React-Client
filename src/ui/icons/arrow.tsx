import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M10 4L6 8L10 12" strokeLinecap="round" strokeLinejoin="round" />
    </Fragment>
  ),
}
