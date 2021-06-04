import { ReactElement } from 'react'
import { useTable } from 'react-table'

interface Props {
  columns: any[]
  data: any[]
}

export const Table = ({ columns, data }: Props): ReactElement => {
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

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="table-fixed text-black">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={Math.random()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()} key={Math.random()}>
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
