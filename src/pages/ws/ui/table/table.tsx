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
// import { VariableSizeList as List } from 'react-window'
// import InfiniteLoader from 'react-window-infinite-loader'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
import { useScrollPosition } from '@core/hooks/use-scroll-position'
import { tableColumnMap } from '@core/table-column-map'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import zoneStore from '@store/filterZone'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { Routes } from '@router/routes.enum'
import { Loader } from '@components/loader'
import { NoResultsFound } from '@components/no-results-found'

interface Props {
  columns: any[]
  data: any[]
}

interface PropsRow {
  index: number
}

export enum RowHeight {
  Compact = 60,
  Basic = 80,
}

const TABLE_SCROLL_POSITION = 'tableScrollPosition'

export const isRowSelected = (
  rowIndex: number,
  activeIndex: number,
): boolean => {
  return toJS(datasetStore.filteredNo)[rowIndex] === activeIndex
}

export const Table = observer(
  ({ columns, data }: Props): ReactElement => {
    const params = useParams()
    const location = useLocation()
    const history = useHistory()
    const alreadyOpened = !!params.get('variant')

    const { selectedFilters } = filterStore

    const cache = new CellMeasurerCache({
      minHeight: 20,
    })

    const {
      selectedGenes,
      selectedGenesList,
      selectedSamples,
      selectedTags,
    } = zoneStore

    const defaultColumn = {
      width: variantStore.drawerVisible
        ? 190
        : (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) / 8,
    }

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      totalColumnsWidth,
      rows,
      prepareRow,
    } = useTable(
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

    const resetTableToInitial = () => {
      filterStore.resetData()
      zoneStore.resetAllSelectedItems()
      datasetStore.clearZone()
      datasetStore.initDatasetAsync()
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

    const renderNoResults = useCallback(() => {
      const isFiltersSelected =
        Object.keys(selectedFilters).length > 0 ||
        selectedGenes.length > 0 ||
        selectedGenesList.length > 0 ||
        selectedSamples.length > 0 ||
        selectedTags.length > 0

      if (datasetStore.tabReport.length === 0) {
        return isFiltersSelected ? (
          <NoResultsFound
            text={t('general.noResultsFoundByFilters')}
            className="text-black font-bold"
            action={{
              text: t('general.resetFilters'),
              handler: resetTableToInitial,
            }}
          />
        ) : (
          <NoResultsFound text={t('general.noResultsFound')} />
        )
      } else {
        return null
      }
    }, [
      selectedFilters,
      selectedGenes,
      selectedGenesList,
      selectedSamples,
      selectedTags,
    ])

    const RenderRow = useCallback(
      ({ index, style, key, parent }) => {
        const row = rows[index]
        const isItemLoaded = index !== rows.length - 1

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
            {({ measure, registerChild }) => {
              // console.log(measure())

              return (
                <div
                  // {...row.getRowProps({
                  //   style,
                  // })}
                  key={key}
                  ref={registerChild}
                  onClick={() => handleOpenVariant(row)}
                  id={`row_${index}`}
                  style={style}
                  className={cn(
                    'cursor-pointer flex items-center tr',
                    variantStore.drawerVisible &&
                      isRowSelected(row.index, variantStore.index)
                      ? 'bg-blue-bright text-white'
                      : 'text-black hover:bg-blue-light',
                  )}
                >
                  {isItemLoaded ? (
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
                            'px-4':
                              cell.column.Header !== tableColumnMap.samples,
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
                    <Loader />
                  )}
                </div>
              )
            }}
          </CellMeasurer>
        )
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleOpenVariant, prepareRow, rows, variantStore.index],
    )

    const handleScrollAsync = async () => {
      console.log('====>', 'Load')

      if (
        toJS(datasetStore.filteredNo).length > 0 &&
        datasetStore.indexFilteredNo < toJS(datasetStore.filteredNo).length
      ) {
        await datasetStore.fetchFilteredTabReportAsync()

        return
      }

      if (!datasetStore.reportsLoaded) {
        await datasetStore.fetchTabReportAsync()
      }
    }

    return (
      <Autosizer>
        {({ height }) => (
          <div style={{ width: totalColumnsWidth }} className="table h-full">
            <div className="thead">
              {headerGroups.map((headerGroup, idx) => {
                const stylesHead = {
                  ...headerGroup.getHeaderGroupProps().style,
                }

                stylesHead.width =
                  Number.parseFloat(stylesHead.width as string) - 8

                return (
                  <div
                    {...headerGroup.getHeaderGroupProps()}
                    key={idx}
                    className="tr"
                    style={stylesHead}
                  >
                    {headerGroup.headers.map((column: any) => {
                      return (
                        <div
                          {...column.getHeaderProps()}
                          key={Math.random()}
                          className="th"
                        >
                          {column.HeaderComponent
                            ? column.render('HeaderComponent')
                            : column.render('Header')}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            {renderNoResults()}

            {toJS(datasetStore.tabReport).length > 0 && (
              <div className="text-12 tbody">
                <InfiniteLoader
                  isRowLoaded={({ index }) => {
                    return !!rows[index + 1]
                  }}
                  rowCount={rows.length}
                  loadMoreRows={handleScrollAsync}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      height={height}
                      rowCount={rows.length}
                      rowHeight={cache.rowHeight}
                      rowRenderer={RenderRow}
                      deferredMeasurementCache={cache}
                      // columnsStore.viewType === ViewTypeEnum.Compact
                      //   ? RowHeight.Compact
                      //   : RowHeight.Basic
                      //}
                      width={totalColumnsWidth}
                      ref={registerChild}
                      onRowsRendered={onRowsRendered}
                    />
                  )}
                </InfiniteLoader>
              </div>
            )}
          </div>
        )}
      </Autosizer>
    )
  },
)
