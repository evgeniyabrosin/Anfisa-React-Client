import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M10.5 3H13V5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 6.5L13 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 13H3V10.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.5L3 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 10.5V13H10.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 9.5L13 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 5.5V3H5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 6.5L3 3" strokeLinecap="round" strokeLinejoin="round" />
    </Fragment>
  ),
}
