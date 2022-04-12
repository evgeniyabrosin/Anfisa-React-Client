import { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import { clone, get } from 'lodash'
import { observer } from 'mobx-react-lite'

import { IGridLayout } from '@declarations'
import { SessionStoreManager } from '@core/storage-management/session-store-manager'
import variantStore from '@store/variant'
import { Icon } from '@ui/icon'
import { DrawerWindow } from './drawer-window'
import { IgvButton } from './igv-button'

interface Props {
  drawerWidth: number
  layout: IGridLayout[]
  setLayout: Dispatch<SetStateAction<IGridLayout[]>>
}

export const VariantBody = observer(
  ({ drawerWidth, layout, setLayout }: Props): ReactElement => {
    const filtered = variantStore.variant

    // important variable to prevent variant block compression after first render
    let indicator = 0

    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      indicator = 1
    })

    const sortGridLayout = (gridLayout: IGridLayout[]) => {
      return [...gridLayout].sort((a, b) => a.y - b.y)
    }

    return (
      <GridLayout
        cols={6}
        layout={layout}
        rowHeight={40}
        containerPadding={[16, 16]}
        width={drawerWidth}
        margin={[8, 8]}
        className="flex-grow overflow-y-auto overflow-x-hidden"
        draggableHandle=".dragHandleSelector"
        onResizeStop={layoutData => {
          layoutData.forEach(layoutItem => {
            variantStore.updateRecordsDisplayConfig(layoutItem.i, layoutItem.h)
          })

          variantStore.checkRecodsDisplaying()
          SessionStoreManager.write('gridLayout', sortGridLayout(layoutData))
          setLayout(layoutData)
        }}
        onLayoutChange={layoutData => {
          if (indicator === 0) {
            return
          } else {
            const sortedGridLayout = sortGridLayout(layoutData)

            layoutData.forEach(layoutItem => {
              variantStore.updateRecordsDisplayConfig(
                layoutItem.i,
                layoutItem.h,
              )
            })

            variantStore.checkRecodsDisplaying()
            SessionStoreManager.write('gridLayout', sortedGridLayout)
            setLayout(sortedGridLayout)
          }
        }}
      >
        {filtered.map((aspect, index: number) => {
          return (
            <div
              data-grid={layout[index]}
              key={aspect.name}
              id="parent"
              className="flex flex-col grid-item-dark flex-shrink-0 bg-blue-dark rounded text-grey-blue mb-2 text-14 leading-16px overflow-hidden pb-3"
            >
              <div
                className="flex justify-between p-3 rounded-t font-bold text-white uppercase cursor-pointer hover:bg-blue-bright"
                onClick={e => {
                  const target = e.target as HTMLButtonElement

                  if (
                    target &&
                    target.classList.contains('dragHandleSelector')
                  ) {
                    return
                  }

                  const cloneRecords: any = variantStore.recordsDisplayConfig

                  const drawerElement = document.querySelector(
                    `#drawer-${aspect.name}`,
                  )

                  const clientHeight = get(
                    drawerElement?.firstChild,
                    'clientHeight',
                    0,
                  )

                  const openedH = clientHeight * 0.0208 + 1.3

                  setLayout((prev: IGridLayout[]) => {
                    const clonedLayout: any[] = clone(prev)

                    const layoutItemIndex = clonedLayout.findIndex(
                      (aspectItem: any) => aspectItem.i === aspect.name,
                    )

                    clonedLayout[layoutItemIndex].h = cloneRecords[aspect.name]
                      .isOpen
                      ? 1
                      : openedH

                    variantStore.updateRecordsDisplayConfig(
                      clonedLayout[layoutItemIndex].i,
                      clonedLayout[layoutItemIndex].h,
                    )

                    const reflowLayout = clonedLayout.map(
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

                    window.sessionStorage.setItem(
                      'gridLayout',
                      JSON.stringify(reflowLayout),
                    )

                    return reflowLayout
                  })
                  variantStore.checkRecodsDisplaying()
                }}
              >
                {aspect.title}
                <div className="flex">
                  {aspect.name === 'view_gen' && <IgvButton />}

                  <Icon
                    name="ArrowsOut"
                    className="dragHandleSelector mr-1 cursor-move hover:text-blue-bright"
                  />
                </div>
              </div>

              <DrawerWindow aspect={aspect} layout={layout} />
            </div>
          )
        })}
      </GridLayout>
    )
  },
)
