import { ReactElement, useEffect } from 'react'
import { useTable } from 'react-table'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useParams } from '@core/hooks/use-params'
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
  return rowIndex === activeIndex
}

export const Table = observer(
  ({ columns, data }: Props): ReactElement => {
    const params = useParams()

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })

    const handleOpenVariant = ({ index }: PropsRow) => {
      columnsStore.setColumns(['Gene', 'Variant'])
      columnsStore.showColumns()
      variantStore.setIndex(index)
      variantStore.setDsName(params.get('ds') ?? '')
      variantStore.setDrawerVisible(true)

      if (window.history.pushState) {
        const newurl =
          window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname +
          `?ds=${params.get('ds') ?? ''}&variant=${index}`

        window.history.pushState({ path: newurl }, '', newurl)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    useEffect(() => {
      const variantNo = params.get('variant')

      variantNo && handleOpenVariant({ index: Number(variantNo) })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Render the UI for your table
    return (
      <table {...getTableProps()} className="table-fixed">
        <thead className="text-black">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()} key={Math.random()}>
                  {column.HeaderComponent
                    ? column.render('HeaderComponent')
                    : column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)

            return (
              <tr
                {...row.getRowProps()}
                key={Math.random()}
                className={cn(
                  'cursor-pointer',
                  isRowSelected(row.index, variantStore.index) &&
                    variantStore.drawerVisible
                    ? 'bg-blue-bright text-white'
                    : 'text-black hover:bg-blue-light',
                )}
                onClick={() =>
                  variantStore.drawerVisible && handleOpenVariant(row)
                }
                onDoubleClick={() =>
                  !variantStore.drawerVisible && handleOpenVariant(row)
                }
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={Math.random()}
                      className={cn(
                        'px-4',
                        columnsStore.viewType === ViewTypeEnum.Compact
                          ? 'py-1'
                          : 'py-4',
                      )}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  },
)
