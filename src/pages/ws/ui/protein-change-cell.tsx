import { ReactElement } from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { ProteinChangeItem } from './protein-change-item'
import { CellI } from './variant-cell'

const Root = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 160px;
`

export const ProteinChangeCell = ({ cell }: CellI): ReactElement => {
  const proteinChanges = get(cell, 'value', []) as string[]

  return (
    <Root>
      {proteinChanges.map((item, index) => (
        <ProteinChangeItem key={index} value={item} />
      ))}
    </Root>
  )
}
