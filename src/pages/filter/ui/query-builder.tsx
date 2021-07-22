import { ReactElement } from 'react'

import { QueryEditor } from './query-editor'
import { QuerySelected } from './query-selected'

export const QueryBuilder = (): ReactElement => {
  return (
    <div className="flex justify-between">
      <QueryEditor />

      <QuerySelected />
    </div>
  )
}
