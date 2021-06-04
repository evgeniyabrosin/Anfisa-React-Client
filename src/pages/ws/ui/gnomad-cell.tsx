import { ReactElement } from 'react'
import get from 'lodash/get'

import { GnomadItem } from './gnomad-item'
import { PredicationI } from './predictions-cell'
import { CellI } from './variant-cell'

export const GnomadCell = ({ cell }: CellI): ReactElement => {
  const gnomads = get(cell, 'value', []) as PredicationI[]

  return (
    <div>
      {gnomads.map(gnomad => (
        <GnomadItem key={gnomad.name} {...gnomad} />
      ))}
    </div>
  )
}
