import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { DsDistItem } from '@declarations'
import useWindowDimensions from '@core/hooks/use-window-dimensions'
import dirinfoStore from '@store/dirinfo'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer(
  (): ReactElement => {
    const { height } = useWindowDimensions()

    const newRef = useRef<any>(null)

    const offsetTop = newRef?.current?.offsetTop

    return (
      <div
        ref={newRef}
        style={{ height: height - offsetTop }}
        className="overflow-y-scroll overflow-x-hidden"
      >
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
