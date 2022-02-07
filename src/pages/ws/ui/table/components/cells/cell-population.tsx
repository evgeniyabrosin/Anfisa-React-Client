import { ReactElement } from 'react'
import get from 'lodash/get'

import { GnomadItem } from '@pages/ws/ui/gnomad-item'
import { CellI, PredicationI } from './cell-interfaces'

export const CellPopulation = ({ cell }: CellI): ReactElement => {
  const gnomads = get(cell, 'value', []) as PredicationI[]

  return (
    <div>
      {gnomads.map(gnomad => (
        <GnomadItem key={gnomad.name} {...gnomad} />
      ))}
    </div>
  )
}
