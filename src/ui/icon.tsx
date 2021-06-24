import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

import Arrow from '@icons/arrow'
import Circle from '@icons/circle'
import Close from '@icons/close'
import ClosePadded from '@icons/close-padded'
import Copy from '@icons/copy'
import CopyLink from '@icons/copy-link'
import Dnd from '@icons/dnd'
import Export from '@icons/export'
import File from '@icons/file'
import Filter from '@icons/filter'
import Folder from '@icons/folder'
import FullScreen from '@icons/full-screen'
import Loupe from '@icons/loupe'
import Rect from '@icons/rect'
import Ring from '@icons/ring'
import Settings from '@icons/settings'
import Sort from '@icons/sort'

interface IconItem {
  size: number
  viewBox: { w: number; h: number }
  stroke?: boolean
  fill?: boolean
  content: ReactElement | ReactNode
}

const iconItems: { [key: string]: IconItem } = {
  Arrow,
  Circle,
  Close,
  ClosePadded,
  CopyLink,
  Copy,
  Export,
  Dnd,
  File,
  Filter,
  Folder,
  FullScreen,
  Loupe,
  Rect,
  Ring,
  Settings,
  Sort,
}

interface IconProps {
  name: string
  size?: number
  stroke?: boolean
  fill?: boolean
  className?: Argument
  onClick?: (event: any) => void
}

export const Icon = ({
  name,
  size,
  stroke,
  fill,
  className,
  onClick,
}: IconProps): ReactElement => {
  const icon: IconItem = iconItems[name]

  // Square icon
  let width = size || icon.size
  let height = size || icon.size

  // Not square icon
  if (icon.viewBox.w !== icon.viewBox.h) {
    width = icon.viewBox.w
    height = icon.viewBox.h

    if (size) {
      width =
        icon.viewBox.w > icon.viewBox.h
          ? size
          : size * (icon.viewBox.w / icon.viewBox.h)

      height =
        icon.viewBox.h > icon.viewBox.w
          ? size
          : size * (icon.viewBox.h / icon.viewBox.w)
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${icon.viewBox.w} ${icon.viewBox.h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        {
          'stroke-current': typeof stroke === 'boolean' ? stroke : icon.stroke,
          'fill-current': typeof fill === 'boolean' ? fill : icon.fill,
        },
        className,
      )}
      onClick={onClick}
    >
      {icon.content}
    </svg>
  )
}
