import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import { Tag } from './tag'

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
        {tags.map(tag => (
          <Tag
            text={tag}
            key={tag}
            isActive={datasetStore.selectedTags.includes(tag)}
            onClick={() => datasetStore.addTag(tag)}
            onRemove={() => datasetStore.removeTag(tag)}
          />
        ))}
      </div>
    )
  },
)
