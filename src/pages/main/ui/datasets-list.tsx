import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import useWindowDimensions from '@core/hooks/use-window-dimensions'
import dirinfoStore from '@store/dirinfo'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer((): ReactElement => {
  const { height } = useWindowDimensions()

  const newRef = useRef<any>(null)

  const offsetTop = newRef?.current?.offsetTop || 0

  return (
    <div
      ref={newRef}
      style={{ height: height - offsetTop }}
      className="overflow-y-auto overflow-x-hidden"
    >
      {dirinfoStore.dsDistKeys.map(key => {
        const { dirinfo } = dirinfoStore
        if (dirinfo) {
          const item: IDirInfoDatasetDescriptor = dirinfo['ds-dict'][key]

          if (!item || item.ancestors.length > 0) {
            return
          }

          return <DatasetsListItem item={item} key={item.name} />
        }
        return null
      })}
    </div>
  )
})
