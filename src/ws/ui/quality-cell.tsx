import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

import dirInfoStore from '../../store/dirinfo'
import { Box } from '../../ui/box'
import { QualityItem } from './quality-item'
import { CellI } from './variant-cell'
export interface QualityI {
  genotype: string
  g_quality: number
}

const Root = styled(Box)`
  display: flex;
  padding-top: 5px;
  width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const getIcon = (
  sampleMeta: { affected: boolean; sex: number } | undefined,
) => {
  if (!sampleMeta) {
    return ''
  }

  if (sampleMeta.affected) {
    return sampleMeta.sex === 1 ? 'fill-rect' : 'outline-rect'
  }

  return sampleMeta.sex === 1 ? 'fill-circle' : 'outline-circle'
}

export const QualityCell = observer(
  ({ cell }: CellI): ReactElement => {
    const [metaSamples, setMetaSamples] = useState<any>({})
    const qualities = get(cell, 'value', {}) as any
    const qualitiesKeys = Object.keys(qualities)

    useEffect(() => {
      setMetaSamples(get(dirInfoStore, 'dsinfo.meta.samples', {}))
    }, [])

    return (
      <Root>
        {qualitiesKeys.map((qualityName, index) => {
          return (
            <QualityItem
              key={index}
              {...qualities[qualityName]}
              iconVariant={getIcon(metaSamples[qualityName])}
            />
          )
        })}
      </Root>
    )
  },
)
