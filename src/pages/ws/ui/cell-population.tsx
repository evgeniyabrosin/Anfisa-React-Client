import { ReactElement } from 'react'
import get from 'lodash/get'

import { CellI, PredicationI } from './cell-interfaces'
import { GnomadItem } from './gnomad-item'

export const CellPopulation = ({ cell }: CellI): ReactElement => {
  const gnomads = get(cell, 'value', []) as PredicationI[]

  if (!gnomads.length) return <div>{'-'}</div>

  return (
    <div>
      {gnomads.map(gnomad => (
        <GnomadItem key={gnomad.name} {...gnomad} />
      ))}
    </div>
  )
}
