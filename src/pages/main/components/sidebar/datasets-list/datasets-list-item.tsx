import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { DatasetName } from '@pages/main/components/sidebar/datasets-list/components/dataset-name'
import { DatasetTime } from '@pages/main/components/sidebar/datasets-list/components/dataset-time'
import {
  DEFAULT_DATASET_P,
  LEVEL_DATASET_P,
} from '@pages/main/components/sidebar/datasets-list/datasets-list.constants'
import { datasetNameByKey } from '@pages/main/components/sidebar/datasets-list/datasets-list.utils'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { DatasetType } from './components/dataset-type'

interface IDatasetsListItemProps {
  item: IDirInfoDatasetDescriptor
  level?: number
}

export const DatasetsListItem: FC<IDatasetsListItemProps> = observer(
  ({ item, level = 1 }) => {
    const history = useHistory()
    const params = useParams()

    const isActive = item.name === dirinfoStore.selectedDirinfoName

    const [isOpenFolder, setIsOpenFolder] = useState(isActive)

    const isNullKind = item.kind === null
    const secondaryKeys: string[] = get(item, 'secondary', [])
    const hasChildren = secondaryKeys.length > 0

    const isActiveParent =
      hasChildren && secondaryKeys.includes(dirinfoStore.selectedDirinfoName)

    useEffect(() => {
      setIsOpenFolder(secondaryKeys.includes(params.get('ds') || ''))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
      if (isNullKind && !hasChildren) return

      if (hasChildren) {
        setIsOpenFolder(prev => !(prev && isActive))
        dirinfoStore.setDsInfo(item as IDirInfoDatasetDescriptor)
      }

      dirinfoStore.setInfoFrameLink('')
      dirinfoStore.setActiveInfoName('')

      history.replace(`${Routes.Root}?ds=${isNullKind ? '' : item.name}`)
    }

    const padding = DEFAULT_DATASET_P + level * LEVEL_DATASET_P
    return (
      <>
        <div
          key={item.name}
          onClick={handleClick}
          className={cn('flex items-center relative w-full pr-4 py-2', {
            'cursor-pointer': hasChildren || !isNullKind,
            'bg-blue-bright hover:bg-blue-hover': isActive,
            'hover:bg-blue-darkHover': !isActive,
          })}
          style={{ paddingLeft: `${padding}px` }}
        >
          <DatasetType
            hasChildren={hasChildren}
            isActive={isActive || isActiveParent}
          />

          <DatasetName
            dsName={item.name}
            kind={item.kind}
            isActive={isActive}
            isActiveParent={isActiveParent}
          />

          <DatasetTime time={item['create-time']} isActive={isActive} />
        </div>

        {isOpenFolder &&
          hasChildren &&
          secondaryKeys.map(datasetNameByKey(level + 1))}
      </>
    )
  },
)
