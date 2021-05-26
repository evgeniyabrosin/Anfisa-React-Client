import { ReactElement } from 'react'

import { DocSvg } from '@icons/doc'
import { FolderSvg } from '@icons/folder'

interface Props {
  kind: string
  isActive?: boolean
}

export const DatasetType = ({ kind, isActive }: Props): ReactElement => {
  const fillColor = isActive ? '#0C65FD' : '#CCCCCC'

  return kind === 'ws' ? (
    <DocSvg fill={fillColor} />
  ) : (
    <FolderSvg fill={fillColor} />
  )
}
