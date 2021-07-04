import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M12 6.5H9.5V4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 3L9.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9.5H6.5V12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13L6.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12V9.5H12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 13L9.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 4V6.5H4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3L6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </Fragment>
  ),
}
