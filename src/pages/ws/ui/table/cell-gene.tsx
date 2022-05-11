import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { geneColorMap } from '@core/gene-color-map'
import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'
import { CellI } from './cell-interfaces'
import { PlusIcon } from './plus-icon'
import { RowHeight } from './table'

export const CellGene = observer(({ cell }: CellI): ReactElement => {
  const value = get(cell, 'value[0]', []) as string[]
  const rowIndex = get(cell, 'row.index', -1)

  const records = toJS(mainTableStore?.wsRecords)
  const iconColor = records?.[rowIndex]?.cl.split('-')[0] || 0

  const geneCellHeight =
    columnsStore.viewType === ViewTypeEnum.Compact
      ? RowHeight.Compact
      : RowHeight.Basic

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

      <div
        className="flex flex-col flex-wrap w-full"
        style={{ maxHeight: `${geneCellHeight}px` }}
      >
        {value.map(gene => (
          <div className="text-14 leading-18px" key={gene}>
            {gene}
          </div>
        ))}
      </div>
    </div>
  )
})
