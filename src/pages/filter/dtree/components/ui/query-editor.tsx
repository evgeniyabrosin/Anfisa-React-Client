import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { EmptySelectedGroup } from './empty-selected-group'

export const QueryEditor = observer((): ReactElement => {
  return (
    <div className="w-full">
      <EmptySelectedGroup className="w-full" />
    </div>
  )
})
