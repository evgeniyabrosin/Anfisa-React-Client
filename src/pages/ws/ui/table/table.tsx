import { ReactElement, useCallback, useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useBlockLayout, useTable } from 'react-table'
import {
  CellMeasurerCache,
  InfiniteLoader,
  List,
  ListRowProps,
} from 'react-virtualized'
import Autosizer from 'react-virtualized-auto-sizer'
import debounce from 'lodash/debounce'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import zoneStore from '@store/filterZone'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { Routes } from '@router/routes.enum'
import { renderNoResults } from './components/render-no-results'
import { TableHeader } from './components/table-header'
import { TableRow } from './components/table-row'
import tableStore from './table.store'

interface Props {
  columns: any[]
  data: any[]
}

export enum RowHeight {
  Compact = 60,
  Cozy = 80,
}

const defaultColumn = {
  width: variantStore.drawerVisible
    ? 190
    : (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) / 8,
}

export const TABLE_SCROLL_POSITION = 'tableScrollPosition'
export const DEFAULT_HEADER_HEIGHT = 40
export const TABLE_WIDTH_WITH_DRAWER = 380

export const Table = observer(({ columns, data }: Props): ReactElement => {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const alreadyOpened = !!params.get('variant')
  const datasetName = params.get('ds') ?? ''

  const routeToVariant = useCallback(
    (variant: number) => {
      let search = location.search

      alreadyOpened && (search = location.search.split('&variant')[0])
      history.push(`${Routes.WS + search}&variant=${variant}`)
    },
    [alreadyOpened, history, location.search],
  )

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        minHeight: 20,
        defaultHeight: RowHeight[columnsStore.viewType],
        fixedWidth: true,
      }),
    [],
  )

  const { headerGroups, totalColumnsWidth, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
  )

  const handleOpenVariant = useCallback(
    (index: number) => {
      tableStore.openVariant(index, datasetName)
      routeToVariant(index)
    },
    [datasetName, routeToVariant],
  )

  useEffect(() => {
    alreadyOpened &&
      handleOpenVariant(
        tableStore.isFiltered ? 0 : Number(params.get('variant')),
      )

    const handleResize = debounce(() => {
      datasetStore.setIsLoadingTabReport(true)

      setTimeout(() => {
        datasetStore.setIsLoadingTabReport(false)
      }, 500)
    }, 500)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const RenderRow = useCallback(
    (rowProps: ListRowProps) => {
      const { index, key, ...rest } = rowProps
      const row = rows[index]
      const isLoading = datasetStore.isFetchingMore && index === rows.length - 1

      prepareRow(row)

      return (
        <TableRow
          isLoading={isLoading}
          cache={cache}
          index={index}
          row={row}
          key={key}
          rowKey={key}
          onClickRow={handleOpenVariant}
          {...rest}
        />
      )
    },
    [rows, prepareRow, cache, handleOpenVariant],
  )

  return (
    <div className="table h-full">
      <TableHeader headerGroups={headerGroups} />

      {renderNoResults(tableStore.resetFilters)}

      {toJS(datasetStore.tabReport).length > 0 && (
        <Autosizer>
          {({ height, width: autosizerWidth }) => (
            <div className="text-12 tbody">
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
                        : cache.rowHeight
                    }
                    rowRenderer={RenderRow}
                    deferredMeasurementCache={cache}
                    width={
                      tableStore.isDrawerActive
                        ? TABLE_WIDTH_WITH_DRAWER
                        : autosizerWidth
                    }
                    scrollToIndex={tableStore.rowToScroll}
                    scrollToAlignment="center"
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                  />
                )}
              </InfiniteLoader>
            </div>
          )}
        </Autosizer>
      )}
    </div>
  )
})
