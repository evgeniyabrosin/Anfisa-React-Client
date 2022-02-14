import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Row } from 'react-table'
import { CellMeasurer, ListRowProps } from 'react-virtualized'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { tableColumnMap } from '@core/table-column-map'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import tableStore from '../table.store'

export interface ITableRowProps extends Omit<ListRowProps, 'key'> {
  row: Row
  rowKey: string
  onClickRow: (index: number) => void
}

const stopPropagation = (event: any) => {
  event.preventDefault()
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
}

// eslint-disable-next-line react/display-name
export const TableRow = observer(
  ({
    row,
    rowKey,
    parent,
    index,
    style,
    onClickRow,
  }: React.PropsWithChildren<ITableRowProps>) => {
    const isSelected =
      variantStore.drawerVisible &&
      variantStore.index != null &&
      tableStore.isRowSelected(index)
    return (
      <CellMeasurer
        cache={tableStore.cache}
        columnIndex={0}
        key={rowKey}
        overscanRowCount={4}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => {
          return (
            <div
              id={String(index)}
              {...row.getRowProps({
                style,
              })}
              onClick={() => onClickRow(index)}
              key={rowKey}
              ref={registerChild}
              style={style}
              className={cn(
                'cursor-pointer flex items-center tr',
                isSelected
                  ? 'bg-blue-bright text-white'
                  : 'text-black hover:bg-blue-light',
              )}
            >
              {row.cells.map((cell: any, cellIdx) => {
                const isSampleColumn = cell?.column?.Header === 'Samples'
                const valueNumber = Object.keys(cell.value).length

                return (
                  <div
                    {...cell.getCellProps()}
                    key={`${index}_${cellIdx}`}
                    className={cn('td overflow-hidden', {
                      'py-1':
                        cell.column.Header !== tableColumnMap.samples &&
                        columnsStore.viewType === ViewTypeEnum.Compact,
                      'py-4':
                        cell.column.Header !== tableColumnMap.samples &&
                        columnsStore.viewType !== ViewTypeEnum.Compact,
                      'px-4': cell.column.Header !== tableColumnMap.samples,
                    })}
                  >
                    {isSampleColumn ? (
                      <div onClick={stopPropagation}>
                        <ScrollContainer
                          style={{
                            cursor: `${valueNumber > 3 ? 'grabbing' : 'auto'}`,
                          }}
                        >
                          {cell.render('Cell')}
                        </ScrollContainer>
                      </div>
                    ) : (
                      cell.render('Cell')
                    )}
                  </div>
                )
              })}
            </div>
          )
        }}
      </CellMeasurer>
    )
  },
)
