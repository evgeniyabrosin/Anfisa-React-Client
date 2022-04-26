import { ReactElement, useRef } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import useClientHeight from '@core/hooks/use-client-height'
import filterStore from '@store/filter'
import { AttributeKinds } from '@service-providers/common'
import { AttributeHeader } from './attribute-header'
import { EmptySelectedGroup } from './empty-selected-group'
import { EnumPanel } from './panels/enum-panel'
import { FunctionPanel } from './panels/function-panel/function-panel'
import { NumericPanel } from './panels/numeric-panel'

export const SelectedGroup = observer((): ReactElement => {
  const { selectedAttributeStatus } = filterStore

  const nonEmptyDivRef = useRef<any>()

  const nonEmptyBlockHeight = useClientHeight(nonEmptyDivRef)

  if (!selectedAttributeStatus) {
    return <EmptySelectedGroup />
  }

  const { isRedactorMode, selectedConditionIndex } = filterStore
  const panelKey = `${selectedAttributeStatus.name}_${selectedConditionIndex}`

  return (
    <div
      ref={nonEmptyDivRef}
      className={cn(
        'border border-grey-disabled pt-3 px-4 w-1/3 overflow-y-auto',
        { 'bg-blue-tertiary': isRedactorMode },
      )}
      style={{ height: nonEmptyBlockHeight }}
    >
      <AttributeHeader attrStatus={selectedAttributeStatus} />

      <div className="bg-grey-light h-px w-full mt-4" />

      {selectedAttributeStatus.kind === AttributeKinds.ENUM && (
        <EnumPanel key={panelKey} />
      )}
      {selectedAttributeStatus.kind === AttributeKinds.FUNC && (
        <FunctionPanel key={panelKey} />
      )}
      {selectedAttributeStatus.kind === AttributeKinds.NUMERIC && (
        <NumericPanel key={panelKey} />
      )}
    </div>
  )
})
