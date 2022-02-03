import { ReactElement } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import filterZone from '@store/filterZone'
import { CellI } from './cell-interfaces'

export const CellSamples = observer(({ cell }: CellI): ReactElement => {
  const qualities = get(cell, 'value', {}) as any

  return (
    <div className="h-full flex text-10">
      {Object.keys(qualities).map((item, index) => (
        <div
          key={item}
          className={cn('w-1/3 px-4 py-4', {
            'bg-orange-light': filterZone.isFather && index === 2,
            'bg-yellow-light': filterZone.isMother && index === 1,
            'bg-purple-light': filterZone.isProband && index === 0,
          })}
        >
          <div>{item}</div>

          <div className="truncate">{qualities[item].genotype}</div>

          <div>{qualities[item].g_quality}</div>
        </div>
      ))}
    </div>
  )
})
