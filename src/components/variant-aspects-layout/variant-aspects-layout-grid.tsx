import { ReactElement, useRef } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import cn from 'classnames'

import { AspectWindow, TWindowToggleHandleParams } from './aspect-window'
import { IVariantAspectsLayoutGridProps } from './variant-aspects-layout.interface'
import {
  adaptLayoutForAspects,
  GRID_LAYOUT_COLS,
  GRID_LAYOUT_CONTAINER_PADDING,
  GRID_LAYOUT_MARGIN,
  GRID_LAYOUT_ROW_HEIGHT,
  maximizeWindow,
  minimizeWindow,
  useGridHandles,
} from './variant-aspects-layout.utils'

const ResponsiveGridLayout = WidthProvider(GridLayout)

export const VariantAspectsLayoutGrid = ({
  className,
  onChangeLayout,
  layout: layoutProp = [],
  aspects,
  igvUrl,
  handles,
}: IVariantAspectsLayoutGridProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [layout, openedWindows] = adaptLayoutForAspects(layoutProp, aspects)

  useGridHandles(handles, { rootRef, layout, onChangeLayout })

  const handleWindowToggle = ({
    name,
    windowEl,
    state,
  }: TWindowToggleHandleParams) => {
    if (!windowEl) {
      return
    }

    onChangeLayout?.(
      state
        ? maximizeWindow({
            name,
            windowEl,
            layout: layout,
          })
        : minimizeWindow({ name, layout: layout }),
    )
  }

  return (
    <div
      ref={rootRef}
      className={cn('relative overflow-y-auto overflow-x-hidden', className)}
    >
      <ResponsiveGridLayout
        layout={layout}
        cols={GRID_LAYOUT_COLS}
        rowHeight={GRID_LAYOUT_ROW_HEIGHT}
        containerPadding={GRID_LAYOUT_CONTAINER_PADDING}
        margin={GRID_LAYOUT_MARGIN}
        draggableHandle="[data-drag-handle]"
        onLayoutChange={onChangeLayout}
      >
        {aspects.map(aspect => (
          <AspectWindow
            key={aspect.name}
            aspect={aspect}
            isMovable
            isResizable
            isOpen={openedWindows.includes(aspect.name)}
            igvUrl={igvUrl}
            onToggle={handleWindowToggle}
          />
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}
