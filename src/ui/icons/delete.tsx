import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path
        d="M13.4998 3.5L2.49976 3.50004"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.5 1.5H10.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.5 3.5V13C12.5 13.1326 12.4473 13.2598 12.3536 13.3536C12.2598 13.4473 12.1326 13.5 12 13.5H4C3.86739 13.5 3.74021 13.4473 3.64645 13.3536C3.55268 13.2598 3.5 13.1326 3.5 13V3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
