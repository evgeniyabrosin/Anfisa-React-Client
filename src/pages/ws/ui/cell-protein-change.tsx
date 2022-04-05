import { ReactElement } from 'react'
import get from 'lodash/get'

import { CellI } from './cell-interfaces'
import { ProteinChangeItem } from './protein-change-item'

export const CellProteinChange = ({ cell }: CellI): ReactElement => {
  const proteinChanges = get(cell, 'value', []) as string[]

  if (!proteinChanges.length) return <div>{'-'}</div>

  return (
    <div className="flex flex-col">
      {proteinChanges.map((item, index) => (
        <ProteinChangeItem key={index} value={item} />
      ))}
    </div>
  )
}
