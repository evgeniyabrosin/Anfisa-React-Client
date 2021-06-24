import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ReccntCommon } from '@declarations'
import variantStore from '@store/variant'

const PreView = ({ content }: ReccntCommon): ReactElement => {
  return <pre className="overflow-y-hidden">{content}</pre>
}

const TableView = ({ colhead, rows }: ReccntCommon): ReactElement => {
  return (
    <div className="overflow-auto" style={{ maxHeight: '460px' }}>
      <table className="min-w-full">
        {colhead && colhead.length > 0 && (
          <thead>
            <tr className="text-blue-bright border-b border-blue-lighter">
              <td />
              {colhead.map((th, i) => (
                <td key={i} className="py-3 pr-3" colSpan={th[1]}>
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
                className="border-b last:border-0 border-blue-lighter"
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
      <div className="p-4 flex-grow overflow-y-scroll overflow-x-hidden flex flex-col">
        {variantStore.variant.map((aspect: ReccntCommon) => {
          if (aspect.rows && aspect.rows.length === 0) {
            return <Fragment key={aspect.name} />
          }

          const currentDisplayConfig =
            variantStore.recordsDisplayConfig[aspect.name]

          return (
            <div
              key={aspect.name}
              className="flex-shrink-0 bg-blue-dark rounded text-grey-blue mb-2 text-14 leading-16px overflow-hidden"
            >
              <div
                className="p-3 rounded-t font-bold text-white uppercase cursor-pointer hover:bg-blue-bright"
                onClick={() => {
                  currentDisplayConfig.isOpen = !currentDisplayConfig.isOpen
                }}
              >
                {aspect.title}
              </div>

              <div
                className={cn(
                  'px-3',
                  currentDisplayConfig?.isOpen ? 'h-auto pb-3' : 'h-0',
                )}
              >
                {aspect.type === 'pre' ? (
                  <PreView {...aspect} />
                ) : (
                  <TableView {...aspect} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
)
