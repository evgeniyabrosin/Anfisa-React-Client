import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path
        d="M10.5 10.4998H13.5V2.49976H5.5V5.49976"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.49976H2.5V13.4998H10.5V5.49976Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
