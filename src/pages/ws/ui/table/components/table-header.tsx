import React from 'react'
import { HeaderGroup } from 'react-table'

import { DEFAULT_HEADER_HEIGHT } from '../table'

export interface ITableHeaderProps {
  headerGroups: HeaderGroup[]
}

export const TableHeader = ({
  headerGroups,
}: React.PropsWithChildren<ITableHeaderProps>) => {
  return (
    <div style={{ height: `${DEFAULT_HEADER_HEIGHT}px` }} className="thead">
      {headerGroups.map((headerGroup, idx) => {
        const stylesHead = {
          ...headerGroup.getHeaderGroupProps().style,
        }

        stylesHead.width = Number.parseFloat(stylesHead.width as string) - 8

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
  )
}
