import { ReactElement, useEffect, useState } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { ANYType } from '@declarations'
import { getIcon } from '@core/get-quality-icon'
import dirInfoStore from '@store/dirinfo'
import { Box } from '@ui/box'
import { QualityItem } from './quality-item'
import { CellI } from './variant-cell'

export interface QualityI {
  genotype: string
  g_quality: number
}

const Root = styled(Box)`
  display: flex;
  padding-top: 5px;
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const QualityCell = observer(
  ({ cell }: CellI): ReactElement => {
    const [metaSamples, setMetaSamples] = useState<ANYType>({})
    const qualities = get(cell, 'value', {}) as ANYType
    const qualitiesKeys = Object.keys(qualities).slice(0, 3)

    useEffect(() => {
      setMetaSamples(get(dirInfoStore, 'dsinfo.meta.samples', {}))
    }, [])

    return (
      <Root>
        {qualitiesKeys.map((qualityName, index) => (
          <QualityItem
            key={index}
            {...qualities[qualityName]}
            iconVariant={getIcon(metaSamples[qualityName])}
          />
        ))}
      </Root>
    )
  },
)
