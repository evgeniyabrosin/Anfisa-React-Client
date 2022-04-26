import { Fragment } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import { Icon } from '@ui/icon'

interface IZoneTagsProps {
  selectedTagsList: string[]
  title: string
  removeZoneTag: (geneName: string, type: string) => void
}

export const ZoneTags = observer(
  ({ selectedTagsList, removeZoneTag }: IZoneTagsProps) => {
    const deleteTag = (item: string) => {
      removeZoneTag(item, 'fast')
      datasetStore.fetchWsListAsync()
    }

    const visibleTagsData = selectedTagsList?.slice(0, 1)

    return (
      <Fragment>
        <div className="flex flex-wrap items-center w-auto max-w-full">
          {visibleTagsData?.map((item: string) => (
            <div key={item}>
              <div className="inline-flex items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-secondary rounded-lg w-auto max-w-full">
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
                'items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-secondary rounded-lg flex-nowrap',
                selectedTagsList && selectedTagsList.length > 1
                  ? 'inline-flex'
                  : 'hidden',
              )}
            >
              {'+'}
              {selectedTagsList && selectedTagsList.length - 1}
            </div>
          </div>
        </div>
      </Fragment>
    )
  },
)
