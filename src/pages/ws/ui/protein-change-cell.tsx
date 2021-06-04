import { ReactElement } from 'react'
import get from 'lodash/get'

import { ProteinChangeItem } from './protein-change-item'
import { CellI } from './variant-cell'

export const ProteinChangeCell = ({ cell }: CellI): ReactElement => {
  const proteinChanges = get(cell, 'value', []) as string[]

  return (
    <div className="flex flex-col">
      {proteinChanges.map((item, index) => (
        <ProteinChangeItem key={index} value={item} />
      ))}
    </div>
  )
}
