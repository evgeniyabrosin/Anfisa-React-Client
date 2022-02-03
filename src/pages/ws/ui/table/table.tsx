import { ReactElement, useCallback, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useHistory, useLocation } from 'react-router-dom'
import { useBlockLayout, useTable } from 'react-table'
import {
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
} from 'react-virtualized'
import Autosizer from 'react-virtualized-auto-sizer'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
import { useScrollPosition } from '@core/hooks/use-scroll-position'
import { tableColumnMap } from '@core/table-column-map'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { Routes } from '@router/routes.enum'
import { Loader } from '@components/loader'
import { renderNoResults } from './components/render-no-results'
import { TableHeader } from './components/table-header'

interface Props {
  columns: any[]
  data: any[]
}

interface PropsRow {
  index: number
}

export enum RowHeight {
  Compact = 60,
  Cozy = 80,
}

export const TABLE_SCROLL_POSITION = 'tableScrollPosition'
export const DEFAULT_HEADER_HEIGHT = 40

export const isRowSelected = (
  rowIndex: number,
  activeIndex: number,
): boolean => {
  return toJS(datasetStore.filteredNo)[rowIndex] === activeIndex
}

export const Table = observer(({ columns, data }: Props): ReactElement => {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const alreadyOpened = !!params.get('variant')

  const cache = new CellMeasurerCache({
    minHeight: 20,
    defaultHeight: RowHeight[columnsStore.viewType],
    fixedWidth: true,
  })

  const defaultColumn = {
    width: variantStore.drawerVisible
      ? 190
      : (window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth) / 8,
  }

  const { headerGroups, totalColumnsWidth, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
  )

  const routeToVariant = (variant: number) => {
    let search = location.search

    alreadyOpened && (search = location.search.split('&variant')[0])
    history.push(`${Routes.WS + search}&variant=${variant}`)
  }

  const isFiltered = (): boolean => {
    return toJS(datasetStore.filteredNo).length > 0
  }

  const [readScrollPosition, writeScrollPosition] = useScrollPosition({
    elem: 'div[role="rowgroup"]>div',
    storageId: TABLE_SCROLL_POSITION,
  })

  const handleOpenVariant = useCallback(
    ({ index }: PropsRow) => {
      if (window.getSelection()?.toString() || datasetStore.isXL) return

      if (!variantStore.drawerVisible) {
        columnsStore.setColumns(columnsStore.getColumnsForOpenDrawer())
        columnsStore.showColumns()
        variantStore.setDsName(params.get('ds') ?? '')
        variantStore.setDrawerVisible(true)
      }

      const idx = isFiltered() ? toJS(datasetStore.filteredNo)[index] : index

      datasetStore.setSelectedVariantNumber(idx)

      variantStore.setIndex(idx)

      variantStore.fetchVarinatInfoAsync()

      routeToVariant(idx)

      writeScrollPosition()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const stopPropagation = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  useEffect(() => {
    alreadyOpened &&
      handleOpenVariant({
        index: isFiltered() ? 0 : Number(params.get('variant')),
      })

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

  useEffect(() => {
    readScrollPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasetStore.isLoadingTabReport])

  const RenderRow = useCallback(
    ({ index, style, key, parent }) => {
      const row = rows[index]

      const isLoading = datasetStore.isFetchingMore && index === rows.length - 1

      prepareRow(row)

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          overscanRowCount={10}
          parent={parent}
          rowIndex={index}
        >
          {({ registerChild }) => {
            return (
              <div
                key={key}
                onClick={() => handleOpenVariant(row)}
                id={`row_${index}`}
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
                  row.cells.map((cell: any) => {
                    const isSampleColumn = cell?.column?.Header === 'Samples'
                    const valueNumber = Object.keys(cell.value).length

                    return (
                      <div
                        {...cell.getCellProps()}
                        key={Math.random()}
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
                                cursor: `${
                                  valueNumber > 3 ? 'grabbing' : 'auto'
                                }`,
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      handleOpenVariant,
      prepareRow,
      rows,
      variantStore.index,
      datasetStore.isFetchingMore,
    ],
  )

  const handleScrollAsync = async () => {
    const datasetVariantsAmount = toJS(datasetStore.filteredNo).length
    const lastLoadedVariant = datasetStore.indexFilteredNo

    const isNeedToLoadMore =
      datasetVariantsAmount > 0 && lastLoadedVariant < datasetVariantsAmount

    if (isNeedToLoadMore) {
      await datasetStore.fetchFilteredTabReportAsync()

      return
    }

    if (!datasetStore.reportsLoaded) {
      await datasetStore.fetchTabReportAsync()
    }
  }

  return (
    <div style={{ width: totalColumnsWidth }} className="table h-full">
      <TableHeader headerGroups={headerGroups} />

      {renderNoResults()}

      {toJS(datasetStore.tabReport).length > 0 && (
        <Autosizer>
          {({ height, width }) => (
            <div className="text-12 tbody">
              <InfiniteLoader
                isRowLoaded={({ index }) => index !== rows.length}
                rowCount={rows.length + 1}
                loadMoreRows={handleScrollAsync}
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
                    width={width}
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
