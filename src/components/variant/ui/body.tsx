import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import variantStore from '@store/variant'

const TableView = (): ReactElement => {
  return <table>data.rows</table>
}

export const VariantBody = observer(
  (): ReactElement => {
    const parsedVariant = variantStore.variant.map(myItem => {
      return JSON.parse(JSON.stringify(myItem))
    })

    return (
      <div className="p-4 flex flex-col">
        {parsedVariant.map(myItem => (
          <div
            key={myItem.title}
            className="bg-blue-dark rounded text-white py-2 px-3 mb-2 text-14 leading-16px"
          >
            <div className="font-bold uppercase mb-3">{myItem.title}</div>

            {myItem.type === 'table' && <TableView />}

            {myItem.type === 'pre' && (
              <pre className="overflow-auto overflow-y-hidden">
                {myItem.content}
              </pre>
            )}
          </div>
        ))}
      </div>
    )
  },
)
