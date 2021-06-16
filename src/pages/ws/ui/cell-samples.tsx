import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { getIcon } from '@core/get-quality-icon'
import dirInfoStore from '@store/dirinfo'
import { CellI } from './cell-interfaces'
import { QualityItem } from './quality-item'

export const CellSamples = observer(
  ({ cell }: CellI): ReactElement => {
    const qualities = get(cell, 'value', {}) as any
    const qualitiesKeys = Object.keys(qualities).slice(0, 3)

    const metaSamples = get(dirInfoStore, 'dsinfo.meta.samples', {})

    return (
      <div className="flex truncate">
        {qualitiesKeys.map((qualityName, index) => (
          <QualityItem
            key={index}
            qualityName={qualityName}
            {...qualities[qualityName]}
            iconVariant={getIcon(metaSamples[qualityName])}
          />
        ))}
      </div>
    )
  },
)
