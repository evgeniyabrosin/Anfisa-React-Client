import { ReactElement, useEffect, useState } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { getIcon } from '@core/get-quality-icon'
import dirInfoStore from '@store/dirinfo'
import { QualityItem } from './quality-item'
import { CellI } from './variant-cell'

export interface QualityI {
  genotype: string
  g_quality: number
}

export const QualityCell = observer(
  ({ cell }: CellI): ReactElement => {
    const [metaSamples, setMetaSamples] = useState<any>({})
    const qualities = get(cell, 'value', {}) as any
    const qualitiesKeys = Object.keys(qualities).slice(0, 3)

    useEffect(() => {
      setMetaSamples(get(dirInfoStore, 'dsinfo.meta.samples', {}))
    }, [])

    return (
      <div className="flex truncate">
        {qualitiesKeys.map((qualityName, index) => (
          <QualityItem
            key={index}
            {...qualities[qualityName]}
            iconVariant={getIcon(metaSamples[qualityName])}
          />
        ))}
      </div>
    )
  },
)
