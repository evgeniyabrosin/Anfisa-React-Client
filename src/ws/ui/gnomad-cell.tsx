import get from 'lodash/get'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { GnomadItem } from './gnomad-item'
import { PredicationI } from './predictions-cell'
import { CellI } from './variant-cell'

const Root = styled(Box)`
  width: 120px;
`

export const GnomadCell = ({ cell }: CellI): ReactElement => {
  const gnomads = get(cell, 'value', []) as PredicationI[]

  return (
    <Root>
      {gnomads.map(gnomad => (
        <GnomadItem key={gnomad.name} {...gnomad} />
      ))}
    </Root>
  )
}
