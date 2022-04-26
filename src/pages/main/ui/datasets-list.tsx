import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import useWindowDimensions from '@core/hooks/use-window-dimensions'
import dirinfoStore from '@store/dirinfo'
import { docLinksHeight } from '@pages/ws/constants'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer((): ReactElement => {
  const { height } = useWindowDimensions()

  const [offsetTop, setOffsetTop] = useState<number>(0)

  const newRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (newRef.current) {
      setOffsetTop(newRef.current?.offsetTop)
    }
  }, [])

  return (
    <div
      ref={newRef}
      style={{ height: height - offsetTop - docLinksHeight }}
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
