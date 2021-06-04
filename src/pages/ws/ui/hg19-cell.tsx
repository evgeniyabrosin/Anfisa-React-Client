import { ReactElement } from 'react'
import get from 'lodash/get'

import { CellI } from './variant-cell'

export const HG19Cell = ({ cell }: CellI): ReactElement => {
  const value = get(cell, 'value', '').split(' ')

  return (
    <div className="text-12 leading-18px">
      <div>{value[0]}</div>
      <div>{value[1]}</div>
    </div>
  )
}
