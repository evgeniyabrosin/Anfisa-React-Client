import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Row } from 'react-table'
import {
  CellMeasurer,
  CellMeasurerCache,
  ListRowProps,
} from 'react-virtualized'
import cn from 'classnames'
import { toJS } from 'mobx'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { tableColumnMap } from '@core/table-column-map'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { Loader } from '@components/loader'

export interface ITableRowProps extends Omit<ListRowProps, 'key'> {
  isLoading: boolean
  cache: CellMeasurerCache
  row: Row
  rowKey: string
  onClickRow: (index: number) => void
}

export const isRowSelected = (
  rowIndex: number,
  activeIndex: number,
): boolean => {
  return toJS(datasetStore.filteredNo)[rowIndex] === activeIndex
}

const stopPropagation = (event: any) => {
  event.preventDefault()
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
}

export const TableRow = ({
  isLoading,
  cache,
  row,
  rowKey,
  parent,
  index,
  style,
  onClickRow,
  isVisible,
}: React.PropsWithChildren<ITableRowProps>) => {
  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={rowKey}
      overscanRowCount={10}
      parent={parent}
      rowIndex={index}
    >
      {({ registerChild }) => {
        return (
          <div
            onClick={() => onClickRow(index)}
            key={rowKey}
            ref={registerChild}
            style={style}
            className={cn(
              'cursor-pointer flex items-center tr',
              variantStore.drawerVisible &&
                isRowSelected(row.index, variantStore.index)
                ? 'bg-blue-bright text-white'
                : 'text-black hover:bg-blue-light',
            )}
          >
            {!isLoading ? (
              row.cells.map((cell: any, cellIdx) => {
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
                      'h-full':
                        cell.column.Header === tableColumnMap.samples &&
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
              })
            ) : (
              <Loader size="s" />
            )}
          </div>
        )
      }}
    </CellMeasurer>
  )
}
