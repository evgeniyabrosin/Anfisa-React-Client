import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ReccntCommon } from '@declarations'
import variantStore from '@store/variant'

const PreView = ({ content }: ReccntCommon): ReactElement => {
  return <pre className="overflow-y-hidden">{content}</pre>
}

const TableView = ({ colhead, rows }: ReccntCommon): ReactElement => {
  return (
    <div className="overflow-auto">
      <table>
        {colhead && colhead.length > 0 && (
          <thead>
            <tr>
              <td />
              {colhead.map((th, i) => (
                <td
                  key={i}
                  className="pb-1 pr-2 text-blue-bright"
                  colSpan={th[1]}
                >
                  {th[0]}
                </td>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows?.map((row, i) => {
            if (!row) return <tr key={i} />

            return (
              <tr
                key={row.name}
                className="border-b last:border-0 border-blue-lighter "
              >
                <td className="py-3 pr-3 text-blue-bright whitespace-nowrap">
                  {row.title}
                  {/* TODO add row.tooltip */}
                </td>
                {row.cells.map((cell, cIndex) => (
                  <td
                    key={cIndex}
                    className="py-3 pr-3 font-medium"
                    dangerouslySetInnerHTML={{ __html: cell[0] }}
                  />
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export const VariantBody = observer(
  (): ReactElement => {
    return (
      <div className="p-4 flex flex-col">
        {variantStore.variant.map((aspect: ReccntCommon) => {
          if (aspect.rows && aspect.rows.length === 0) {
            return <Fragment key={aspect.name} />
          }

          return (
            <div
              key={aspect.name}
              className="bg-blue-dark rounded text-grey-blue py-2 px-3 mb-2 text-14 leading-16px overflow-hidden"
            >
              <div className="font-bold text-white uppercase mb-3">
                {aspect.title}
              </div>

              {aspect.type === 'pre' ? (
                <PreView {...aspect} />
              ) : (
                <TableView {...aspect} />
              )}
            </div>
          )
        })}
      </div>
    )
  },
)
