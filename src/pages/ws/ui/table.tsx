import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useBlockLayout, useTable } from 'react-table'
import { FixedSizeList } from 'react-window'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
import { useVariantIndex } from '@core/hooks/use-variant-index'
import { tableColumnMap } from '@core/table-column-map'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'

interface Props {
  columns: any[]
  data: any[]
}

interface PropsRow {
  index: number
}

export const isRowSelected = (
  rowIndex: number,
  activeIndex: number,
): boolean => {
  return (
    (datasetStore.filteredNo.length === 0
      ? rowIndex
      : datasetStore.filteredNo[rowIndex]) === activeIndex
  )
}

export const Table = observer(
  ({ columns, data }: Props): ReactElement => {
    const params = useParams()
    const { setVariantIndex } = useVariantIndex()
    const [ref, setRef] = useState<any>(null)

    const defaultColumn = {
      width: variantStore.drawerVisible
        ? 190
        : (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) / 8,
    }

    useEffect(() => {
      ref?.scrollToItem(variantStore.index)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, variantStore.index])

    useEffect(() => {
      const handleResize = debounce(() => {
        datasetStore.setIsLoadingTabReport(true)

        setTimeout(() => {
          datasetStore.setIsLoadingTabReport(false)
        }, 500)
      }, 500)

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
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
      const variantIndex =
        datasetStore.filteredNo.length === 0
          ? index
          : datasetStore.filteredNo[index]

      columnsStore.setColumns(['Gene', 'Variant'])
      columnsStore.showColumns()
      variantStore.setDsName(params.get('ds') ?? '')
      variantStore.setIndex(variantIndex)
      variantStore.setDrawerVisible(true)

      setVariantIndex(variantIndex)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      params.get('variantIndex') &&
        handleOpenVariant({
          index: !variantStore.index
            ? Number(params.get('variantIndex'))
            : variantStore.index,
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            onClick={() => variantStore.drawerVisible && handleOpenVariant(row)}
            onDoubleClick={() =>
              !variantStore.drawerVisible && handleOpenVariant(row)
            }
          >
            {row.cells.map((cell: any) => {
              return (
                <div
                  {...cell.getCellProps()}
                  key={Math.random()}
                  className={cn(
                    'px-4',
                    columnsStore.viewType === ViewTypeEnum.Compact
                      ? 'py-1'
                      : 'py-4',
                  )}
                  style={{
                    width:
                      cell.column.Header === tableColumnMap.samples
                        ? `${
                            Number.parseFloat(cell.getCellProps().style.width) +
                            100
                          }px`
                        : cell.getCellProps().style.width,
                  }}
                >
                  {cell.render('Cell')}
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
        datasetStore.filteredNo.length > 0 &&
        datasetStore.indexFilteredNo < datasetStore.filteredNo.length
      ) {
        await datasetStore.fetchFilteredTabReportAsync()

        return
      }

      await datasetStore.fetchTabReportAsync()
    }

    return (
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map(headerGroup => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              key={Math.random()}
              className="tr"
            >
              {headerGroup.headers.map((column: any) => (
                <div
                  {...column.getHeaderProps()}
                  key={Math.random()}
                  className="th"
                  style={{
                    width:
                      column.Header === tableColumnMap.samples
                        ? `${
                            Number.parseFloat(
                              column.getHeaderProps().style.width,
                            ) + 100
                          }px`
                        : column.getHeaderProps().style.width,
                  }}
                >
                  {column.HeaderComponent
                    ? column.render('HeaderComponent')
                    : column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="text-12 tbody">
          <FixedSizeList
            ref={setRef}
            height={
              (window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight) - 200
            }
            itemCount={rows.length}
            initialScrollOffset={datasetStore.offset}
            itemSize={columnsStore.viewType === ViewTypeEnum.Compact ? 60 : 80}
            onScroll={debounce(props => {
              datasetStore.setTableOffest(props.scrollOffset)

              if (
                props.scrollDirection === 'forward' &&
                props.scrollOffset >= 2800
              ) {
                handleScrollAsync()
              }
            }, 700)}
            width={totalColumnsWidth}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    )
  },
)
