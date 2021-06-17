import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M4 8H12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 5H14.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 11H9.5" strokeLinecap="round" strokeLinejoin="round" />
    </Fragment>
  ),
}
