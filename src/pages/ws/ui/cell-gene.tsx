import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { geneColorMap } from '@core/gene-color-map'
import datasetStore from '@store/dataset'
import columnsStore from '@store/wsColumns'
import { CellI } from './cell-interfaces'
import { PlusIcon } from './plus-icon'
import { RowHeight } from './table/table'

export const CellGene = observer(({ cell }: CellI): ReactElement => {
  const value = get(cell, 'value[0]', []) as string[]
  const rowIndex = get(cell, 'row.index', -1)

  const records = toJS(datasetStore?.wsRecords)
  const iconColor = records?.[rowIndex]?.cl.split('-')[0]

  const isCompactView = columnsStore.viewType === ViewTypeEnum.Compact

  const cellProps: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = isCompactView
    ? {
        style: {
          maxHeight: isCompactView
            ? `${RowHeight[ViewTypeEnum.Compact] - 10}px`
            : 'auto',
        },
        title: value.join('\n'),
      }
    : {}

  return (
    <div className="flex items-center">
      {records?.[rowIndex]?.cl && (
        <Fragment>
          {records?.[rowIndex]?.cl.includes('cross') ? (
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
        </Fragment>
      )}

      <div {...cellProps}>
        {value.map(gene => (
          <div className="text-14 leading-18px" key={gene}>
            {gene}
          </div>
        ))}
      </div>
    </div>
  )
})
