import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { AttributeKinds } from '@service-providers/common'
import { EmptySelectedGroup } from './empty-selected-group'
import { EnumPanel } from './panels/enum-panel'
import { FunctionPanel } from './panels/function-panel/function-panel'
import { NumericPanel } from './panels/numeric-panel'

interface ISelectedGroupProps {
  className?: string
}

export const SelectedGroup = observer(
  ({ className }: ISelectedGroupProps): ReactElement => {
    const { selectedAttributeStatus } = filterStore

    if (!selectedAttributeStatus) {
      return <EmptySelectedGroup className={className} />
    }

    const { isRedactorMode, selectedConditionIndex } = filterStore
    const panelKey = `${selectedAttributeStatus.name}_${selectedConditionIndex}`

    return (
      <div
        className={cn(
          'flex flex-col p-4 overflow-y-auto',
          {
            'bg-blue-tertiary': isRedactorMode,
          },
          className,
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
  },
)
