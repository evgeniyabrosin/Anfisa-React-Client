import { ReactElement } from 'react'
import { useTable } from 'react-table'
import cn from 'classnames'

import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import variantStore, { VariantStore } from '@store/variant'

interface Props {
  columns: any[]
  data: any[]
}

interface PropsRow {
  index: number
}

export const isRowSelected = (
  rowIndex: number,
  store: VariantStore,
): boolean => {
  return rowIndex === store.index && store.drawerVisible
}

export const Table = ({ columns, data }: Props): ReactElement => {
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
    datasetStore.setColumns(['Gene', 'Variant'])
    datasetStore.showColumns()
    variantStore.setIndex(index)
    variantStore.setDsName(params.get('ds') ?? '')
    variantStore.setDrawerVisible(true)
  }

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
                isRowSelected(row.index, variantStore)
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
                  <td {...cell.getCellProps()} key={Math.random()}>
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
}
