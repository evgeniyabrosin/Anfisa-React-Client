import { ReactElement } from 'react'
import get from 'lodash/get'

import { EMPTY_VALUE } from '@pages/ws/constants'
import { CellI, PredicationI } from './cell-interfaces'
import { GnomadItem } from './gnomad-item'

export const CellPopulation = ({ cell }: CellI): ReactElement => {
  const gnomads = get(cell, 'value', []) as PredicationI[]

  if (!gnomads.length || gnomads.every(item => !item.value)) {
    return <div>{EMPTY_VALUE}</div>
  }

  return (
    <div>
      {gnomads.map(gnomad => (
        <GnomadItem key={gnomad.name} {...gnomad} />
      ))}
    </div>
  )
}
