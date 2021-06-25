import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { getVariantColor } from '@core/get-variant-color'
import { CellI } from './cell-interfaces'

export const CellGene = observer(
  ({ cell }: CellI): ReactElement => {
    const value = get(cell, 'value[0]', []) as string[]
    const colorNumber = get(cell, 'value[1]', -1)

    return (
      <div className="flex items-center">
        <div
          className="flex-shrink-0 w-2 h-2 rounded-full mr-1.5"
          style={{
            border: `2px solid ${getVariantColor(colorNumber)}`,
          }}
        />

        <div>
          {value.map(gene => (
            <div className="text-14 leading-18px" key={gene}>
              {gene}
            </div>
          ))}
        </div>
      </div>
    )
  },
)
