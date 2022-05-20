import { ReactElement, useRef } from 'react'

import useClientHeight from '@core/hooks/use-client-height'
import { DtreeUnitsList } from '@pages/filter/dtree/components/dtree-units-list'
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
      <DtreeUnitsList isModal={false} className="w-1/3" />

      <QueryBuilderTree />
    </div>
  )
}
