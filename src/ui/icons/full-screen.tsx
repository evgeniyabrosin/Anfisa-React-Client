import { Fragment } from 'react'

const size = 20

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path
        d="M13.125 4.25H16.25V7.375"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 16.75H3.75V13.625"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 13.625V16.75H13.125"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 7.375V4.25H6.875"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
