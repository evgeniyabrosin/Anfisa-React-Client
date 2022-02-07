import { ReactElement } from 'react'
import get from 'lodash/get'

import { Tag } from '@ui/tag'
import { CellI } from './cell-interfaces'

export const CellTags = ({ cell }: CellI): ReactElement => {
  const tags =
    Object.keys(get(cell, 'value', {}) || {}).filter(tag => tag !== '_note') ||
    []

  if (tags.length === 0) {
    return <div>{'-'}</div>
  }

  return (
    <div className="flex flex-wrap">
      {tags.slice(0, 2).map(tag => (
        <Tag key={tag} text={tag} isActive hideCloseIcon />
      ))}

      {tags.length > 2 && (
        <Tag text={`+${tags.length - 2}`} isActive hideCloseIcon />
      )}
    </div>
  )
}
