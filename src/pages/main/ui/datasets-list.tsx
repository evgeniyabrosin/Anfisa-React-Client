import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import useClientHeight from '@core/hooks/use-client-height'
import dirinfoStore from '@store/dirinfo'
import { docLinksHeight } from '@pages/ws/constants'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer((): ReactElement => {
  const divRef = useRef<any>()

  const blockHeight = useClientHeight(divRef)

  return (
    <div
      ref={divRef}
      style={{ height: blockHeight - docLinksHeight }}
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
