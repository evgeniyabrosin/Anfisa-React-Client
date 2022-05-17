import { ReactElement, useCallback, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useHistory, useLocation } from 'react-router-dom'
import { useBlockLayout, useTable } from 'react-table'
import Autosizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
import { useScrollPosition } from '@core/hooks/use-scroll-position'
import { tableColumnMap } from '@core/table-column-map'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import zoneStore from '@store/ws/zone'
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
const DEFAULT_HEADER_HEIGHT = 40

export const isRowSelected = (
  rowIndex: number,
  activeIndex: number,
): boolean => {
  return toJS(mainTableStore.filteredNo)[rowIndex] === activeIndex
}

export const Table = observer(({ columns, data }: Props): ReactElement => {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const alreadyOpened = !!params.get('variant')

  const filterConditions = filterStore.conditions

  const { selectedGenes, selectedGenesList, selectedSamples, selectedTags } =
    zoneStore

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
    return toJS(mainTableStore.filteredNo).length > 0
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
        variantStore.setDsName(params.get('ds') ?? '')
        variantStore.setDrawerVisible(true)
      }

      const idx = isFiltered() ? toJS(mainTableStore.filteredNo)[index] : index

      mainTableStore.setSelectedVariantNumber(idx)

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
    filterStore.reset()
    zoneStore.resetAllSelectedItems()
    zoneStore.clearZone()
    // datasetStore.fetchWsListAsync('reset') // fix to smth reset
  }

  useEffect(() => {
    alreadyOpened &&
      handleOpenVariant({
        index: !isFiltered() ? 0 : Number(params.get('variant')),
      })

    const handleResize = debounce(() => {
      mainTableStore.setIsLoadingTabReport(true)

      setTimeout(() => {
        mainTableStore.setIsLoadingTabReport(false)
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
  }, [mainTableStore.isLoadingTabReport])

  const renderNoResults = useCallback(() => {
    const isFiltersSelected =
      filterConditions.length > 0 ||
      selectedGenes.length > 0 ||
      selectedGenesList.length > 0 ||
      selectedSamples.length > 0 ||
      selectedTags.length > 0

    if (mainTableStore.wsRecords?.length === 0) {
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
    filterConditions.length,
    selectedGenes,
    selectedGenesList,
    selectedSamples,
    selectedTags,
  ])

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index]

      const isLoading =
        mainTableStore.isFetchingMore && index === rows.length - 1

      prepareRow(row)

      return (
        <div
          {...row.getRowProps({
            style,
          })}
          onClick={() => handleOpenVariant(row)}
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
                  className={cn('td ', {
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
                    'overflow-hidden': !isSampleColumn,
                  })}
                >
                  {isSampleColumn ? (
                    <div onClick={stopPropagation}>
                      <ScrollContainer
                        style={{
                          cursor: `${valueNumber > 3 ? 'grabbing' : 'pointer'}`,
                          overflow: `${valueNumber > 3 ? 'hidden' : 'visible'}`,
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      handleOpenVariant,
      prepareRow,
      rows,
      variantStore.index,
      mainTableStore.isFetchingMore,
    ],
  )

  const handleScrollAsync = debounce(async () => {
    const datasetVariantsAmount = toJS(mainTableStore.filteredNo).length
    const lastLoadedVariant = mainTableStore.indexFilteredNo

    const isNeedToLoadMore =
      datasetVariantsAmount > 0 && lastLoadedVariant < datasetVariantsAmount

    if (isNeedToLoadMore) {
      await mainTableStore.fetchFilteredTabReportAsync()

      return
    }

    if (!mainTableStore.reportsLoaded) {
      await mainTableStore.fetchTabReportAsync()
    }
  }, 100)

  return (
    <div
      {...getTableProps()}
      style={{ width: totalColumnsWidth }}
      className="table h-full"
    >
      <div style={{ height: `${DEFAULT_HEADER_HEIGHT}px` }} className="thead">
        {headerGroups.map(headerGroup => {
          const stylesHead = {
            ...headerGroup.getHeaderGroupProps().style,
          }

          stylesHead.width = Number.parseFloat(stylesHead.width as string) - 8

          return (
            <div
              {...headerGroup.getHeaderGroupProps()}
              key={Math.random()}
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

      {toJS(mainTableStore.tabReport).length > 0 && (
        <Autosizer>
          {({ height }) => (
            <div {...getTableBodyProps()} className="text-12 tbody">
              <InfiniteLoader
                isItemLoaded={index => index !== rows.length}
                itemCount={rows.length + 1}
                loadMoreItems={handleScrollAsync}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    height={height - DEFAULT_HEADER_HEIGHT}
                    itemCount={rows.length}
                    itemSize={
                      columnsStore.viewType === ViewTypeEnum.Compact
                        ? RowHeight.Compact
                        : RowHeight.Basic
                    }
                    width={totalColumnsWidth}
                    ref={ref}
                    onItemsRendered={onItemsRendered}
                  >
                    {RenderRow}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            </div>
          )}
        </Autosizer>
      )}
    </div>
  )
})
