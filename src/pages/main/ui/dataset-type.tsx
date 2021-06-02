import { ReactElement } from 'react'

import { theme } from '@theme'
import { FileSvg } from '@icons/file'
import { FolderSvg } from '@icons/folder'

interface Props {
  kind: string
  isActive?: boolean
}

export const DatasetType = ({ kind, isActive }: Props): ReactElement => {
  const fillColor = isActive
    ? theme('colors.blue.bright')
    : theme('colors.grey.blue')

  return kind === 'ws' ? (
    <FileSvg fill={fillColor} />
  ) : (
    <FolderSvg fill={fillColor} />
  )
}
