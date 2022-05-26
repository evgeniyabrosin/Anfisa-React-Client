import { Fragment } from 'react'

const size = 5

export default {
  size,
  viewBox: { w: size, h: size },
  fill: true,
  content: (
    <Fragment>
      <rect width={size} height={size} />
    </Fragment>
  ),
}
