import { ReactElement } from 'react'

import { Icon } from '@ui/icon'

interface Props {
  hasChildren: boolean
  isActive?: boolean
}

export const DatasetType = ({ hasChildren, isActive }: Props): ReactElement => {
  const color = isActive ? 'text-blue-bright' : 'text-grey-blue'

  return <Icon name={hasChildren ? 'Folder' : 'File'} className={color} />
}
