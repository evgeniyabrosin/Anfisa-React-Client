import { Fragment, ReactElement, useState } from 'react'
import GridLayout from 'react-grid-layout'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ReccntCommon } from '@declarations'
import variantStore from '@store/variant'

const PreView = ({ content }: ReccntCommon): ReactElement => {
  return <pre className="overflow-y-hidden">{content}</pre>
}

const defaultLayout = [
  { y: 0, x: 0, w: 6, h: 1, i: 'view_gen' },
  { y: 1, x: 0, w: 6, h: 1, i: 'view_transcripts' },
  { y: 2, x: 0, w: 6, h: 1, i: 'colocated_v' },
  { y: 3, x: 0, w: 6, h: 1, i: 'input' },
  { y: 4, x: 0, w: 6, h: 1, i: 'transcripts' },
  { y: 5, x: 0, w: 6, h: 1, i: 'view_db' },
  { y: 6, x: 0, w: 6, h: 1, i: 'view_genetics' },
  { y: 7, x: 0, w: 6, h: 1, i: 'view_gnomAD' },
  { y: 8, x: 0, w: 6, h: 1, i: 'view_pharmagkb' },
  { y: 9, x: 0, w: 6, h: 1, i: 'view_pred' },
  { y: 10, x: 0, w: 6, h: 1, i: 'view_qsamples' },
  { y: 11, x: 0, w: 6, h: 1, i: '_main' },
]

const TableView = ({ colhead, rows }: ReccntCommon): ReactElement => {
  return (
    <div>
      <table className="min-w-full">
        {colhead && colhead.length > 0 && (
          <thead>
            <tr className="text-blue-bright border-b border-blue-lighter">
              <td />
              {colhead.map((th, i) => (
                <td key={i} className="py-3 pr-4" colSpan={th[1]}>
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
  ({ drawerWidth }: { drawerWidth: number }): ReactElement => {
    const [layout, setLayout] = useState(defaultLayout)

    return (
      <GridLayout
        cols={6}
        rowHeight={40}
        containerPadding={[16, 16]}
        width={drawerWidth}
        margin={[8, 8]}
        className="flex-grow overflow-y-scroll overflow-x-hidden"
        onLayoutChange={newLayout => setLayout(newLayout)}
      >
        {variantStore.variant.map((aspect: ReccntCommon) => {
          if (aspect.rows && aspect.rows.length === 0) {
            return <Fragment key={aspect.name} />
          }

          const item = layout.find(row => row.i === aspect.name)

          if (!item) return

          const currentDisplayConfig =
            variantStore.recordsDisplayConfig[aspect.name]

          return (
            <div
              key={aspect.name}
              className="flex-shrink-0 bg-blue-dark rounded text-grey-blue mb-2 text-14 leading-16px overflow-hidden"
              data-grid={item}
            >
              <div
                className="p-3 rounded-t font-bold text-white uppercase cursor-pointer hover:bg-blue-bright"
                onClick={() => {
                  currentDisplayConfig.isOpen = !currentDisplayConfig.isOpen
                  // currentDisplayConfig.h = currentDisplayConfig.isOpen ? 1 : 5+

                  item.h += 1

                  console.log(item)

                  setLayout(layout)
                }}
              >
                {item.h}
                {aspect.title}
              </div>

              <div className={cn('px-3 overflow-auto')}>
                {aspect.type === 'pre' ? (
                  <PreView {...aspect} />
                ) : (
                  <TableView {...aspect} />
                )}
              </div>
            </div>
          )
        })}
      </GridLayout>
    )
  },
)
