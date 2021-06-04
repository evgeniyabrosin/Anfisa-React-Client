import { ReactElement } from 'react'
import get from 'lodash/get'

import { Tag } from '@ui/tag'
import { CellI } from './variant-cell'

export const TagsCell = ({ cell }: CellI): ReactElement => {
  const tags = Object.keys(get(cell, 'value', {}) || {}) || []

  if (tags.length === 0) {
    return <div>-</div>
  }

  return (
    <div className="flex flex-wrap">
      {tags.map(tag => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  )
}
