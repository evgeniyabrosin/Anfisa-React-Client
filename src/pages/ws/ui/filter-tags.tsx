import { Fragment } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'
import { Icon } from '@ui/icon'

type Props = {
  data?: string[]
  isGenes?: boolean
  isGenesList?: boolean
  isSamples?: boolean
  isTags?: boolean
}

export const FilterTags = observer(
  ({ data, isGenes, isGenesList, isSamples, isTags }: Props) => {
    const deleteTag = (item: string) => {
      isGenes && zoneStore.removeGene(item)
      isGenesList && zoneStore.removeGenesList(item)
      isSamples && zoneStore.removeSample(item)
      isTags && zoneStore.removeTag(item)
    }

    const visibleTagsData = data?.slice(0, 2)

    return (
      <Fragment>
        <div
          className="flex flex-wrap items-center"
          style={{ width: 'auto', maxWidth: '100%' }}
        >
          {visibleTagsData?.map((item: string) => (
            <div key={item}>
              <div
                style={{ width: 'auto', maxWidth: '100%' }}
                className="inline-flex items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-bright rounded-lg"
              >
                <div className="truncate w-auto" style={{ maxWidth: 96 }}>
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
              style={{ display: data && data.length >= 3 ? 'flex' : 'none' }}
              className={cn(
                ' w-8.5 inline-flex flex-nowrap items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-bright rounded-lg',
              )}
            >
              + {data && data.length - 2}
            </div>
          </div>
        </div>
      </Fragment>
    )
  },
)
