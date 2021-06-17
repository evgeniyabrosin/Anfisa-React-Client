import { ReactElement } from 'react'

import { Icon } from '@ui/icon'

interface Props {
  kind: string
  isActive?: boolean
}

export const DatasetType = ({ kind, isActive }: Props): ReactElement => {
  const color = isActive ? 'text-blue-bright' : 'text-grey-blue'

  return kind === 'ws' ? (
    <Icon name="File" className={color} />
  ) : (
    <Icon name="Folder" className={color} />
  )
}
