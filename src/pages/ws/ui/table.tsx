import { ReactElement, useCallback, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useBlockLayout, useTable } from 'react-table'
import { FixedSizeList } from 'react-window'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
import { tableColumnMap } from '@core/table-column-map'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { NoResultsFound } from '@components/no-results-found'

interface Props {
  columns: any[]
  data: any[]
}

interface PropsRow {
  index: number
}

const offsetSize = 2800
const offsetSizeToLoad = (offsetSize / 100) * 60

export const isRowSelected = (
  rowIndex: number,
  activeIndex: number,
): boolean => {
  return toJS(datasetStore.filteredNo)[rowIndex] === activeIndex
}

export const Table = observer(
  ({ columns, data }: Props): ReactElement => {
    const params = useParams()

    const defaultColumn = {
      width: variantStore.drawerVisible
        ? 190
        : (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) / 8,
    }

    useEffect(() => {
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

    const handleOpenVariant = useCallback(({ index }: PropsRow) => {
      if (window.getSelection()?.toString() || datasetStore.isXL) return

      const idx =
        toJS(datasetStore.filteredNo).length === 0
          ? index
          : toJS(datasetStore.filteredNo)[index]

      if (!variantStore.drawerVisible) {
        columnsStore.setColumns(columnsStore.getColumnsForOpenDrawer())
        columnsStore.showColumns()
        variantStore.setDsName(params.get('ds') ?? '')
      }

      variantStore.setIndex(idx)
      variantStore.setChoosedIndex(index)

      variantStore.setIsActiveVariant()

      variantStore.fetchVarinatInfoAsync()

      if (!variantStore.drawerVisible) {
        variantStore.setDrawerVisible(true)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      variantStore.isActiveVariant &&
        handleOpenVariant({
          index: 0,
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const stopPropagation = (event: any) => {
      event.preventDefault()
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
    }

    const RenderRow = useCallback(
      ({ index, style }) => {
        const row = rows[index]

        prepareRow(row)

        return (
          <div
            {...row.getRowProps({
              style,
            })}
            className={cn(
              'cursor-pointer flex items-center tr',
              variantStore.drawerVisible &&
                isRowSelected(row.index, variantStore.index)
                ? 'bg-blue-bright text-white'
                : 'text-black hover:bg-blue-light',
            )}
            onClick={() => handleOpenVariant(row)}
          >
            {row.cells.map((cell: any) => {
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
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleOpenVariant, prepareRow, rows, variantStore.index],
    )

    const handleScrollAsync = async () => {
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
      <div
        {...getTableProps()}
        style={{ width: totalColumnsWidth }}
        className="table h-full"
      >
        <div className="thead">
          {headerGroups.map(headerGroup => {
            const stylesHead = { ...headerGroup.getHeaderGroupProps().style }

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

        {toJS(datasetStore.tabReport).length === 0 && <NoResultsFound />}

        {toJS(datasetStore.tabReport).length > 0 && (
          <div {...getTableBodyProps()} className="text-12 tbody">
            <FixedSizeList
              height={
                (window.innerHeight ||
                  document.documentElement.clientHeight ||
                  document.body.clientHeight) - 200
              }
              itemCount={rows.length}
              initialScrollOffset={datasetStore.offset}
              itemSize={
                columnsStore.viewType === ViewTypeEnum.Compact ? 60 : 80
              }
              onScroll={debounce(props => {
                if (
                  props.scrollOffset >
                  datasetStore.offset + offsetSizeToLoad
                ) {
                  datasetStore.setTableOffest(props.scrollOffset)
                  handleScrollAsync()
                }
              }, 100)}
              width={totalColumnsWidth}
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        )}
      </div>
    )
  },
)
