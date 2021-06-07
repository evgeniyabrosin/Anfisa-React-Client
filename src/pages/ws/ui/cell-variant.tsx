import { ReactElement } from 'react'
import get from 'lodash/get'

import { CellI } from './cell-interfaces'

export const CellVariant = ({ cell }: CellI): ReactElement => {
  const value = get(cell, 'value', '').split(' ')

  return (
    <div className="text-12 leading-18px">
      <div>{value[0]}</div>
      <div>{value[1]}</div>
    </div>
  )
}
