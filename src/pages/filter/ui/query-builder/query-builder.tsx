import { ReactElement } from 'react'

import { QueryBuilderGroups } from './query-builder-groups'
import { QueryBuilderTree } from './query-builder-tree'

export const QueryBuilder = (): ReactElement => {
  return (
    <div
      className="flex overflow-y-hidden"
      style={{ maxHeight: 'calc(100vh - 155px)' }}
    >
      <QueryBuilderGroups />

      <QueryBuilderTree />
    </div>
  )
}
