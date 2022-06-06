import { Ref, RefObject, useImperativeHandle, useRef } from 'react'
import { Layout } from 'react-grid-layout'

import { TAspectDescriptor } from '@service-providers/dataset-level/dataset-level.interface'
import {
  TVariantAspectsGridHandles,
  TVariantAspectsGridLayout,
  TVariantAspectsLayoutGridChangeHandler,
} from './variant-aspects-layout.interface'

export const GRID_LAYOUT_COLS = 3
export const GRID_LAYOUT_ROW_HEIGHT = 40
export const GRID_LAYOUT_SPACING = 8
export const GRID_LAYOUT_MARGIN: [number, number] = [
  GRID_LAYOUT_SPACING,
  GRID_LAYOUT_SPACING,
]
export const GRID_LAYOUT_CONTAINER_PADDING: [number, number] = [16, 16]

export const adaptLayoutForAspects = (
  layout: TVariantAspectsGridLayout,
  aspects: TAspectDescriptor[],
): [Layout[], string[]] => {
  let adaptedLayout = layout

  let maxY = layout.reduce((acc, item) => {
    const bottom = item.y + item.h

    return bottom > acc ? bottom : acc
  }, 0)

  for (const aspect of aspects) {
    if (layout.every(layout => layout.i !== aspect.name)) {
      adaptedLayout = [
        ...adaptedLayout,
        {
          i: aspect.name,
          x: 0,
          y: maxY++,
          w: GRID_LAYOUT_COLS,
          h: 1,
        },
      ]
    }
  }

  const openedWindows = adaptedLayout
    .filter(item => item.h > 1)
    .map(item => item.i)

  return [adaptedLayout, openedWindows]
}

type TMaximizeWindowParams = {
  name: string
  windowEl: HTMLElement
  layout: TVariantAspectsGridLayout
}

export const maximizeWindow = ({
  name,
  windowEl,
  layout,
}: TMaximizeWindowParams): TVariantAspectsGridLayout => {
  const itemIndex = layout.findIndex(item => item.i === name)

  if (itemIndex < 0) {
    return layout
  }
  const contentEl: HTMLDivElement | null = windowEl.querySelector(
    '[data-window-content]',
  )

  if (!contentEl) {
    return layout
  }

  const contentStyle = getComputedStyle(contentEl)

  const height =
    windowEl.clientHeight -
    contentEl.clientHeight +
    contentEl.scrollHeight +
    parseInt(contentStyle.marginTop, 10) +
    parseInt(contentStyle.marginBottom, 10)

  // height = h * rowHeight + (h - 1) * margin
  // h = (height + margin) / (rowHeight + margin)
  const h = Math.ceil(
    (height + GRID_LAYOUT_SPACING) /
      (GRID_LAYOUT_ROW_HEIGHT + GRID_LAYOUT_SPACING),
  )
  const newLayout = layout.slice()

  newLayout[itemIndex] = {
    ...layout[itemIndex],
    w: GRID_LAYOUT_COLS,
    h,
  }

  return newLayout
}

export const maximizeAllWindows = (
  rootEl: HTMLDivElement | null,
  layout: TVariantAspectsGridLayout,
): TVariantAspectsGridLayout => {
  if (!rootEl) {
    return layout
  }

  let newLayout = layout

  rootEl.querySelectorAll<HTMLDivElement>('[data-window]').forEach(windowEl => {
    const name = windowEl.dataset.window

    if (name) {
      newLayout = maximizeWindow({
        name,
        windowEl,
        layout: newLayout,
      })
    }
  })

  return newLayout
}

type TMinimizeWindowParams = {
  name: string
  layout: TVariantAspectsGridLayout
}

export const minimizeWindow = ({
  name,
  layout,
}: TMinimizeWindowParams): TVariantAspectsGridLayout => {
  const itemIndex = layout.findIndex(item => item.i === name)

  if (itemIndex < 0) {
    return layout
  }

  const newLayout = layout.slice()

  newLayout[itemIndex] = {
    ...layout[itemIndex],
    h: 1,
  }

  return newLayout
}

type TUseGridHandlesOptions = {
  rootRef: RefObject<HTMLDivElement>
  layout: TVariantAspectsGridLayout
  onChangeLayout?: TVariantAspectsLayoutGridChangeHandler
}

export const useGridHandles = (
  handlesRef: Ref<TVariantAspectsGridHandles> | undefined,
  { rootRef, layout, onChangeLayout }: TUseGridHandlesOptions,
) => {
  const handlesDeps: [
    TVariantAspectsGridLayout,
    TVariantAspectsLayoutGridChangeHandler | undefined,
  ] = [layout, onChangeLayout]
  const handlesDepsRef = useRef(handlesDeps)
  handlesDepsRef.current = handlesDeps

  useImperativeHandle(
    handlesRef,
    () => {
      return {
        maximizeAll: () => {
          const [currentLayout, onChange] = handlesDepsRef.current

          onChange?.(maximizeAllWindows(rootRef.current, currentLayout))
        },
        minimizeAll: () => {
          const [, onChange] = handlesDepsRef.current

          onChange?.([])
        },
      }
    },
    [rootRef],
  )
}
