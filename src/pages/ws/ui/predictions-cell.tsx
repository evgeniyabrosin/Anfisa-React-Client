import { ReactElement } from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { PredictionItem } from './prediction-item'
import { CellI } from './variant-cell'

export interface PredicationI {
  name: string
  value?: string[]
}

const Root = styled(Box)`
  width: 150px;
  padding-right: 10px;
`

export const PredictionsCell = ({ cell }: CellI): ReactElement => {
  const predictions = get(cell, 'value', []) as PredicationI[]

  return (
    <Root>
      {predictions.map((prediction: PredicationI) => (
        <PredictionItem key={prediction.name} {...prediction} />
      ))}
    </Root>
  )
}
