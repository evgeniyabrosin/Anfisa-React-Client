import { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import { observer } from 'mobx-react-lite'

import { IGridLayout } from '@declarations'
import { SessionStoreManager } from '@core/storage-management/session-store-manager'
import variantStore from '@store/ws/variant'
import { DrawerWindow } from './drawer-window'

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
              <DrawerWindow
                aspect={aspect}
                layout={layout}
                setLayout={setLayout}
              />
            </div>
          )
        })}
      </GridLayout>
    )
  },
)
