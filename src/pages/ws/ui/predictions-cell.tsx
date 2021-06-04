import { ReactElement } from 'react'
import get from 'lodash/get'

import { PredictionItem } from './prediction-item'
import { CellI } from './variant-cell'

export interface PredicationI {
  name: string
  value?: string[]
}

export const PredictionsCell = ({ cell }: CellI): ReactElement => {
  const predictions = get(cell, 'value', []) as PredicationI[]

  return (
    <div>
      {predictions.map((prediction: PredicationI) => (
        <PredictionItem key={prediction.name} {...prediction} />
      ))}
    </div>
  )
}
