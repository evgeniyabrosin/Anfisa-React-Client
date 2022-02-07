import { Fragment, ReactElement } from 'react'
import get from 'lodash/get'

import { PredictionItem } from '@pages/ws/ui/prediction-item'
import { CellI, PredicationI } from './cell-interfaces'

export const CellInSilico = ({ cell }: CellI): ReactElement => {
  const predictions = get(cell, 'value', []) as PredicationI[]

  return (
    <Fragment>
      <div className="flex flex-col">
        {predictions.map((prediction: PredicationI) => (
          <PredictionItem key={prediction.name} {...prediction} />
        ))}
      </div>
    </Fragment>
  )
}
