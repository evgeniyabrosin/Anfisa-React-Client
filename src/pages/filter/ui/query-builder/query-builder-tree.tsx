import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { QueryBuilderTotalNumbers } from './query-builder-total-numbers'
import { QueryBuilderTreeHeader } from './query-builder-tree-header'
import { QueryBuilderTreeView } from './query-builder-tree-view'

export const QueryBuilderTree = observer(
  (): ReactElement => {
    console.log('current STEP DATA:', toJS(dtreeStore.stepData))

    return (
      <div className="flex flex-col w-2/3">
        <QueryBuilderTotalNumbers />

        <div className="flex flex-col h-screen overflow-y-scroll">
          <QueryBuilderTreeHeader />

          <QueryBuilderTreeView />
        </div>
      </div>
    )
  },
)
