import React from 'react'
import { HeaderGroup } from 'react-table'

import { DEFAULT_HEADER_HEIGHT } from '../constants'

export interface ITableHeaderProps {
  headerGroups: HeaderGroup[]
}

export const TableHeader = ({
  headerGroups,
}: React.PropsWithChildren<ITableHeaderProps>) => {
  return (
    <div style={{ height: `${DEFAULT_HEADER_HEIGHT}px` }} className="thead">
      {headerGroups.map((headerGroup, idx) => {
        return (
          <div
            {...headerGroup.getHeaderGroupProps()}
            key={idx}
            className="tr"
            // style={stylesHead}
          >
            {headerGroup.headers.map((column: any) => {
              return (
                <div
                  {...column.getHeaderProps()}
                  key={column.Header}
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
  )
}
