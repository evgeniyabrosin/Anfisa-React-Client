import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { CellI } from './cell-interfaces'
import { CellSample } from './cell-sample'

export interface IQualities {
  [key: string]: {
    genotype: string
    g_quality: number
  }
}

export const CellSamples = observer(({ cell }: CellI): ReactElement => {
  const qualities = get(cell, 'value', {}) as IQualities

  const samplesAmount: number = Object.keys(cell.value).length

  return (
    <div className="h-full flex text-10">
      {Object.keys(qualities).map((item, index) => (
        <CellSample
          key={item + index}
          qualities={qualities}
          sample={item}
          samplesAmount={samplesAmount}
          index={index}
        />
      ))}
    </div>
  )
})
