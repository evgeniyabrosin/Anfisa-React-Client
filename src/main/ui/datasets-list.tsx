import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'

import { DsDistItem } from '../../..'
import dirinfoStore from '@store/dirinfo'
import { Box } from '@ui/box'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer(
  (): ReactElement => {
    return (
      <Box>
        {dirinfoStore.dsDistKeys.map(key => {
          const item: DsDistItem = dirinfoStore.dirinfo['ds-dict'][key]

          if (!item || item.ancestors.length > 0) {
            return
          }

          return <DatasetsListItem item={item} key={item.name} />
        })}
      </Box>
    )
  },
)
