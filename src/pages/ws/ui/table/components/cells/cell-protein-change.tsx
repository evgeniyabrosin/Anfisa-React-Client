import { ReactElement } from 'react'
import get from 'lodash/get'

import { ProteinChangeItem } from '@pages/ws/ui/protein-change-item'
import { CellI } from './cell-interfaces'

export const CellProteinChange = ({ cell }: CellI): ReactElement => {
  const proteinChanges = get(cell, 'value', []) as string[]

  return (
    <div className="flex flex-col">
      {proteinChanges.map((item, index) => (
        <ProteinChangeItem key={index} value={item} />
      ))}
    </div>
  )
}
