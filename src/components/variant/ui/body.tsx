import { ReactElement } from 'react'
import GridLayout from 'react-grid-layout'
import cn from 'classnames'
import { clone, cloneDeep, get } from 'lodash'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ReccntCommon } from '@declarations'
import variantStore from '@store/variant'
import { Icon } from '@ui/icon'

const PreView = ({ content }: ReccntCommon): ReactElement => {
  return <pre className="overflow-y-hidden">{content}</pre>
}

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

interface Props {
  drawerWidth: number
  layout: any
  setLayout: any
}

export const VariantBody = observer(
  ({ drawerWidth, layout, setLayout }: Props): ReactElement => {
    const filtered = variantStore.variant.filter(
      (aspect: ReccntCommon) => !(aspect.rows && aspect.rows.length === 0),
    )

    return (
      <GridLayout
        cols={6}
        layout={layout}
        rowHeight={40}
        containerPadding={[16, 16]}
        width={drawerWidth}
        margin={[8, 8]}
        className="flex-grow overflow-y-scroll overflow-x-hidden"
        draggableHandle=".dragHandleSelector"
        onResizeStop={layoutData => {
          setLayout(layoutData)
        }}
        onLayoutChange={newLayout => {
          setLayout(newLayout)
        }}
      >
        {filtered.map((aspect: ReccntCommon, index: number) => {
          return (
            <div
              data-grid={{ x: 0, y: index, w: 6, h: 1, i: aspect.name }}
              key={aspect.name}
              className="flex-shrink-0 bg-blue-dark rounded text-grey-blue mb-2 text-14 leading-16px overflow-hidden pb-3"
            >
              <div
                className="flex justify-between p-3 rounded-t font-bold text-white uppercase cursor-pointer hover:bg-blue-bright"
                onClick={() => {
                  const cloneRoot: any = cloneDeep(
                    variantStore.recordsDisplayConfig,
                  )

                  const drawerElement = document.querySelector(
                    `#drawer-${aspect.name}`,
                  )

                  const openedH = Math.ceil(
                    get(drawerElement, 'clientHeight', 0) / 40 + 1,
                  )

                  setLayout((prev: any[]) => {
                    const cloned: any[] = clone(prev)

                    const layoutItemIndex = cloned.findIndex(
                      (aspectItem: any) => aspectItem.i === aspect.name,
                    )

                    cloned[layoutItemIndex].h = cloneRoot[aspect.name].isOpen
                      ? 1
                      : openedH

                    const reflowLayout = cloned.map(
                      (layoutItem, layoutIndex: number) => {
                        if (layoutIndex < layoutItemIndex) {
                          return layoutItem
                        }

                        return {
                          ...layoutItem,
                          y: layoutItem.y + openedH,
                        }
                      },
                    )

                    return reflowLayout
                  })

                  cloneRoot[aspect.name] = {
                    isOpen: !cloneRoot[aspect.name].isOpen,
                    h: cloneRoot[aspect.name].isOpen ? 1 : openedH,
                  }

                  runInAction(() => {
                    variantStore.recordsDisplayConfig = cloneRoot
                  })
                }}
              >
                {aspect.title}

                <div className="flex">
                  <Icon
                    name="ArrowsOut"
                    className="dragHandleSelector cursor-move hover:text-blue-bright"
                  />
                </div>
              </div>

              <div
                className={cn('px-3 overflow-auto')}
                id={`drawer-${aspect.name}`}
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
      </GridLayout>
    )
  },
)
