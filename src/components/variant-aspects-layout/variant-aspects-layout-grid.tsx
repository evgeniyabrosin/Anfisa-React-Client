import { ReactElement } from 'react'
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
} from './variant-aspects-layout.utils'

const ResponsiveGridLayout = WidthProvider(GridLayout)

export const VariantAspectsLayoutGrid = ({
  className,
  onLayoutChange,
  layout = [],
  aspects,
  igvUrl,
}: IVariantAspectsLayoutGridProps): ReactElement => {
  const [adaptedLayout, openedWindows] = adaptLayoutForAspects(layout, aspects)

  const handleWindowToggle = ({
    name,
    windowEl,
    contentEl,
    state,
  }: TWindowToggleHandleParams) => {
    if (!windowEl || !contentEl) {
      return
    }

    onLayoutChange?.(
      state
        ? maximizeWindow({
            name,
            windowEl,
            contentEl,
            layout: adaptedLayout,
          })
        : minimizeWindow({ name, layout: adaptedLayout }),
    )
  }

  return (
    <div
      className={cn('relative overflow-y-auto overflow-x-hidden', className)}
    >
      <ResponsiveGridLayout
        layout={adaptedLayout}
        cols={GRID_LAYOUT_COLS}
        rowHeight={GRID_LAYOUT_ROW_HEIGHT}
        containerPadding={GRID_LAYOUT_CONTAINER_PADDING}
        margin={GRID_LAYOUT_MARGIN}
        draggableHandle="[data-drag-handle]"
        onLayoutChange={onLayoutChange}
      >
        {aspects.map(aspect => (
          <AspectWindow
            key={aspect.name}
            aspect={aspect}
            isOpen={openedWindows.includes(aspect.name)}
            igvUrl={igvUrl}
            onToggle={handleWindowToggle}
          />
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}
