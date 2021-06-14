import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import { Tag } from './tag'

interface Props {
  tags: string[]
}

export const Tags = observer(
  ({ tags }: Props): ReactElement => {
    if (tags.length === 0) {
      return <div className="text-center py-4 text-grey-0">No tags</div>
    }

    return (
      <div className="flex flex-wrap max-w-xs">
        {tags.map(tag => (
          <Tag
            text={tag}
            key={tag}
            isActive={datasetStore.selectedTags.includes(tag)}
          />
        ))}
      </div>
    )
  },
)
