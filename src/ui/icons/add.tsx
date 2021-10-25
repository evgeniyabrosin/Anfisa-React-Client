import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  fill: true,
  content: (
    <Fragment>
      <circle cx="8" cy="8" r="8" />
      <path d="M8 4L8 12" stroke="white" strokeLinecap="round" />
      <path d="M12 8L4 8" stroke="white" strokeLinecap="round" />
    </Fragment>
  ),
}
