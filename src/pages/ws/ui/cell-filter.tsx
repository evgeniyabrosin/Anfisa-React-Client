import { ReactElement } from 'react'
import get from 'lodash/get'

import { CellI } from './cell-interfaces'

export const CellFilter = (cell: CellI): ReactElement => {
  const filters = get(cell, 'value', []) as string[]

  if (!filters.length) return <div>{'-'}</div>

  return <div className="break-words break-all w-20">{filters[0]}</div>
}
