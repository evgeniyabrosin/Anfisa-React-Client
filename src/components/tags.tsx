import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'
import { Tag } from '@ui/tag'

interface Props {
  tags: string[]
  className?: Argument
}

export const Tags = observer(
  ({ tags, className }: Props): ReactElement => {
    if (tags.length === 0) {
      return <div className="text-center py-4 text-grey-blue">No tags</div>
    }

    return (
      <div className={cn('flex', className)}>
        {tags.map(tag => {
          const isActive = zoneStore.selectedTags.includes(tag)

          return (
            <Tag
              text={tag}
              key={tag}
              isActive={isActive}
              onClick={() => !isActive && zoneStore.addTag(tag)}
              onRemove={() => isActive && zoneStore.removeTag(tag)}
            />
          )
        })}
      </div>
    )
  },
)
