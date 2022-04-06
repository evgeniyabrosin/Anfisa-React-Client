import { ReactElement } from 'react'
import get from 'lodash/get'

import { EMPTY_VALUE } from '@pages/ws/constants'
import { CellI } from './cell-interfaces'

export const CellFilter = (cell: CellI): ReactElement => {
  const filters = get(cell, 'value', []) as string[]

  if (!filters.length) return <div>{EMPTY_VALUE}</div>

  return <div className="break-words break-all w-20">{filters[0]}</div>
}
