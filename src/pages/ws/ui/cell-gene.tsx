import { ReactElement } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { geneColorMap } from '@core/gene-color-map'
import datasetStore from '@store/dataset'
import { CellI } from './cell-interfaces'
import { PlusIcon } from './plus-icon'
export const CellGene = observer(
  ({ cell }: CellI): ReactElement => {
    const value = get(cell, 'value[0]', []) as string[]
    const rowIndex = get(cell, 'row.index', -1)

    const iconColor = datasetStore.wsRecords[rowIndex].cl.split('-')[0]

    return (
      <div className="flex items-center">
        {datasetStore.wsRecords[rowIndex].cl.includes('cross') ? (
          <PlusIcon color={geneColorMap[iconColor]} />
        ) : (
          <div
            className={cn(
              'flex-shrink-0 w-2.5 h-2.5 rounded-full mr-1.5 border-2',
              {
                'bg-grey-blue': iconColor === 'grey',
              },
            )}
            style={{
              border: `2px solid ${geneColorMap[iconColor]}`,
            }}
          />
        )}

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
