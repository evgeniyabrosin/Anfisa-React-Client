import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  strokeColor: 'white',
  content: (
    <Fragment>
      <path
        d="M5.375 3.625L8 1L10.625 3.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 8V1" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M11 6H12.5C12.6326 6 12.7598 6.05268 12.8536 6.14645C12.9473 6.24021 13 6.36739 13 6.5V13C13 13.1326 12.9473 13.2598 12.8536 13.3536C12.7598 13.4473 12.6326 13.5 12.5 13.5H3.5C3.36739 13.5 3.24021 13.4473 3.14645 13.3536C3.05268 13.2598 3 13.1326 3 13V6.5C3 6.36739 3.05268 6.24021 3.14645 6.14645C3.24021 6.05268 3.36739 6 3.5 6H5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
