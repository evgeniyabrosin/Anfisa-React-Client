import { Fragment } from 'react'

const size = 5

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <circle cx="2.5" cy="2.5" r="2" />
    </Fragment>
  ),
}
