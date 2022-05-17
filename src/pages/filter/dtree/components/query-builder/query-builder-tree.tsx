import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { QueryBuilderResults } from './query-builder-results'
import { QueryBuilderTreeHeader } from './query-builder-tree-header'
import { QueryBuilderTreeView } from './query-builder-tree-view'

export const QueryBuilderTree = observer((): ReactElement => {
  return (
    <div className="flex flex-col w-2/3">
      <QueryBuilderResults />

      <div className="flex flex-col h-screen overflow-y-scroll">
        <QueryBuilderTreeHeader />

        <QueryBuilderTreeView />
      </div>
    </div>
  )
})
