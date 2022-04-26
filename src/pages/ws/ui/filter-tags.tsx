import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import zoneStore, { ZoneName } from '@store/filterZone'
import { Icon } from '@ui/icon'

export const FilterTags = observer(
  ({ list, zone }: { list?: string[]; zone: ZoneName }) => {
    const deleteTag = (item: string) => {
      zoneStore.removeItem(item, zone, 'fast')

      datasetStore.fetchWsListAsync()
    }

    const visibleTagsData = list?.slice(0, 2)

    return (
      <div className="flex flex-wrap items-center w-auto max-w-full">
        {visibleTagsData?.map((item: string) => (
          <div key={item}>
            <div className="inline-flex items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-bright rounded-lg w-auto max-w-full">
              <div className="truncate w-auto" style={{ maxWidth: 70 }}>
                {item === '_note' ? item.replace('_note', 'notes') : item}
              </div>

              <Icon
                onClick={() => deleteTag(item)}
                name="Close"
                size={8}
                className="ml-1"
              />
            </div>
          </div>
        ))}

        <div>
          <div
            className={cn(
              'items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-bright rounded-lg flex-nowrap',
              list && list.length >= 3 ? 'inline-flex' : 'hidden',
            )}
          >
            {'+ '}
            {list && list.length - 2}
          </div>
        </div>
      </div>
    )
  },
)
