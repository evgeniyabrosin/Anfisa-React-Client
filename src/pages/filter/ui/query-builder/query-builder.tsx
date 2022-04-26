import { ReactElement, useRef } from 'react'

import useClientHeight from '@core/hooks/use-client-height'
import { QueryBuilderGroups } from './groups/query-builder-groups'
import { QueryBuilderTree } from './query-builder-tree'

export const QueryBuilder = (): ReactElement => {
  const nonEmptyDivRef = useRef<any>()
  const nonEmptyBlockHeight = useClientHeight(nonEmptyDivRef)

  return (
    <div
      ref={nonEmptyDivRef}
      className="flex overflow-y-hidden"
      style={{ maxHeight: nonEmptyBlockHeight }}
    >
      <QueryBuilderGroups />

      <QueryBuilderTree />
    </div>
  )
}
