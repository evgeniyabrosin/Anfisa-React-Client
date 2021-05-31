import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { DsDistItem } from '@declarations'
import dirinfoStore from '@store/dirinfo'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer(
  (): ReactElement => {
    return (
      <div>
        {dirinfoStore.dsDistKeys.map(key => {
          const item: DsDistItem = dirinfoStore.dirinfo['ds-dict'][key]

          if (!item || item.ancestors.length > 0) {
            return
          }

          return <DatasetsListItem item={item} key={item.name} />
        })}
      </div>
    )
  },
)
