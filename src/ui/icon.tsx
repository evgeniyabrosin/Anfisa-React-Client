import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

import Add from '@icons/add'
import Arrow from '@icons/arrow'
import ArrowsOut from '@icons/arrows-out'
import Circle from '@icons/circle'
import Close from '@icons/close'
import ClosePadded from '@icons/close-padded'
import Cloud from '@icons/cloud'
import Collapse from '@icons/collapse'
import Copy from '@icons/copy'
import CopyLink from '@icons/copy-link'
import Delete from '@icons/delete'
import Dnd from '@icons/dnd'
import Ellipsis from '@icons/ellipsis'
import Expand from '@icons/expand'
import Export from '@icons/export'
import File from '@icons/file'
import Filter from '@icons/filter'
import Folder from '@icons/folder'
import FullScreen from '@icons/full-screen'
import Import from '@icons/import'
import Info from '@icons/info'
import Lines from '@icons/lines'
import Loupe from '@icons/loupe'
import Options from '@icons/options'
import Rect from '@icons/rect'
import Redo from '@icons/redo'
import Settings from '@icons/settings'
import SettingsFat from '@icons/settings-fat'
import Sort from '@icons/sort'
import ThreadAdd from '@icons/thread-add'
import ThreadClose from '@icons/thread-close'
import Undo from '@icons/undo'

interface IconItem {
  size: number
  viewBox: { w: number; h: number }
  stroke?: boolean
  fill?: boolean
  content: ReactElement | ReactNode
}

export type TIcons =
  | 'Add'
  | 'Arrow'
  | 'ArrowsOut'
  | 'Circle'
  | 'Close'
  | 'Collapse'
  | 'ClosePadded'
  | 'Cloud'
  | 'CopyLink'
  | 'Copy'
  | 'Delete'
  | 'Dnd'
  | 'Ellipsis'
  | 'Export'
  | 'Expand'
  | 'File'
  | 'Filter'
  | 'Folder'
  | 'FullScreen'
  | 'Import'
  | 'Info'
  | 'Lines'
  | 'Loupe'
  | 'Options'
  | 'Rect'
  | 'Redo'
  | 'Settings'
  | 'SettingsFat'
  | 'Sort'
  | 'ThreadAdd'
  | 'ThreadClose'
  | 'Undo'

const iconItems: Record<TIcons, IconItem> = {
  Add,
  Arrow,
  ArrowsOut,
  Circle,
  Close,
  Collapse,
  ClosePadded,
  Cloud,
  CopyLink,
  Copy,
  Delete,
  Dnd,
  Ellipsis,
  Export,
  Expand,
  File,
  Filter,
  Folder,
  FullScreen,
  Import,
  Info,
  Lines,
  Loupe,
  Options,
  Rect,
  Redo,
  Settings,
  SettingsFat,
  Sort,
  ThreadAdd,
  ThreadClose,
  Undo,
}

interface IconProps {
  name: TIcons
  size?: number
  stroke?: boolean
  fill?: boolean
  className?: Argument
  onClick?: (event: any) => void
  onMouseUp?: (event: any) => void
  onMouseDown?: (event: any) => void
  dataTestId?: string
}

export const Icon = ({
  name,
  size,
  stroke,
  fill,
  className,
  onClick,
  onMouseDown,
  onMouseUp,
  dataTestId,
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
      data-testid={dataTestId}
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
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
    >
      {icon.content}
    </svg>
  )
}
