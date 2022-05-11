import { FC } from 'react'

import { Icon } from '@ui/icon'

interface IDatasetTypeProps {
  hasChildren: boolean
  isActive?: boolean
}

export const DatasetType: FC<IDatasetTypeProps> = ({
  hasChildren,
  isActive,
}) => {
  const color = !isActive ? 'text-blue-bright' : 'text-white'

  return <Icon name={hasChildren ? 'Folder' : 'File'} className={color} />
}
