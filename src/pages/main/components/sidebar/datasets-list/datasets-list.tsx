import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { datasetNameByKey } from '@pages/main/components/sidebar/datasets-list/datasets-list.utils'

export const DatasetsList = observer((): ReactElement => {
  return (
    <div className="overflow-y-auto overflow-x-hidden">
      {dirinfoStore.dsDistKeys.map(datasetNameByKey())}
    </div>
  )
})
