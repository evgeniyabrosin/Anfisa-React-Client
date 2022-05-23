import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { AttributeKinds } from '@service-providers/common'
import { EmptySelectedGroup } from './empty-selected-group'
import { EnumPanel } from './panels/enum-panel'
import { FunctionPanel } from './panels/function-panel/function-panel'
import { NumericPanel } from './panels/numeric-panel'

export const SelectedGroup = observer((): ReactElement => {
  const { selectedAttributeStatus } = filterStore

  if (!selectedAttributeStatus) {
    return <EmptySelectedGroup />
  }

  const { isRedactorMode, selectedConditionIndex } = filterStore
  const panelKey = `${selectedAttributeStatus.name}_${selectedConditionIndex}`

  return (
    <div
      className={cn(
        'flex flex-col border-r border-grey-disabled pt-4 px-4 w-1/3 overflow-y-auto h-full',
        {
          'bg-blue-tertiary': isRedactorMode,
        },
      )}
    >
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
