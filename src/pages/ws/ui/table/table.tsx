import { ReactElement, useCallback, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useFlexLayout, useTable } from 'react-table'
import { InfiniteLoader, List, ListRowProps } from 'react-virtualized'
import Autosizer from 'react-virtualized-auto-sizer'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import columnsStore from '@store/wsColumns'
import { Routes } from '@router/routes.enum'
import { renderNoResults } from './components/render-no-results'
import { TableHeader } from './components/table-header'
import { TableRow } from './components/table-row'
import { DEFAULT_HEADER_HEIGHT, RowHeight } from './constants'
import tableStore from './table.store'

interface ITableProps {
  columns: any[]
  data: any[]
}

export const Table = observer(
  ({ columns, data }: ITableProps): ReactElement => {
    const params = useParams()
    const location = useLocation()
    const history = useHistory()
    const alreadyOpened = !!params.get('variant')
    const datasetName = params.get('ds') ?? ''
    let listRef: List | null = null

    const defaultColumn = {
      minWidth: 120,
    }

    const routeToVariant = useCallback(
      (variant: number) => {
        let search = location.search

        alreadyOpened && (search = location.search.split('&variant')[0])
        history.push(`${Routes.WS + search}&variant=${variant}`)
      },
      [alreadyOpened, history, location.search],
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
          defaultColumn,
        },
        useFlexLayout,
      )

    const handleOpenVariant = useCallback(
      (index: number) => {
        tableStore.openVariant(index, datasetName)
        routeToVariant(index)
      },
      [datasetName, routeToVariant],
    )

    useEffect(() => {
      tableStore.createCache()

      alreadyOpened &&
        handleOpenVariant(
          tableStore.isFiltered ? 0 : Number(params.get('variant')),
        )

      return () => tableStore.clearStore()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      listRef?.recomputeRowHeights()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableStore.isDrawerActive, tableStore.isCompactView])

    const RenderRow = useCallback(
      (rowProps: ListRowProps) => {
        const { index, key, ...rest } = rowProps
        const row = rows[index]
        const isLoading =
          datasetStore.isFetchingMore && index === rows.length - 1

        prepareRow(row)

        return (
          <TableRow
            isLoading={isLoading}
            index={index}
            row={row}
            key={key}
            rowKey={key}
            onClickRow={handleOpenVariant}
            {...rest}
          />
        )
      },
      [rows, prepareRow, handleOpenVariant],
    )

    return (
      <div {...getTableProps()} className="table h-full w-full">
        <TableHeader headerGroups={headerGroups} />

        {renderNoResults(tableStore.resetFilters)}

        {toJS(datasetStore.tabReport).length > 0 && (
          <Autosizer>
            {({ height, width: autosizerWidth }) => (
              <div {...getTableBodyProps()} className="text-12 tbody">
                <InfiniteLoader
                  isRowLoaded={({ index }) => index !== rows.length}
                  rowCount={rows.length + 1}
                  loadMoreRows={tableStore.loadData}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      height={height - DEFAULT_HEADER_HEIGHT}
                      rowCount={rows.length}
                      rowHeight={
                        columnsStore.viewType === ViewTypeEnum.Compact
                          ? RowHeight[ViewTypeEnum.Compact]
                          : tableStore.cache.rowHeight
                      }
                      rowRenderer={RenderRow}
                      deferredMeasurementCache={tableStore.cache}
                      width={autosizerWidth}
                      scrollToIndex={tableStore.rowToScroll}
                      scrollToAlignment="center"
                      ref={list => {
                        listRef = list
                        registerChild(list)
                      }}
                      onRowsRendered={params => {
                        if (params.stopIndex === datasetStore.variantsAmount) {
                          onRowsRendered({
                            ...params,
                            stopIndex: datasetStore.variantsAmount,
                          })

                          return
                        }

                        onRowsRendered(params)
                      }}
                    />
                  )}
                </InfiniteLoader>
              </div>
            )}
          </Autosizer>
        )}
      </div>
    )
  },
)
