import { ReactElement } from 'react'
import cn from 'classnames'
import Tooltip from 'rc-tooltip'

import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { AttributeKinds, TPropertyStatus } from '@service-providers/common'

interface IAttributeHeaderProps {
  className?: string
  attrStatus: TPropertyStatus
  chosenAttributes?: number
  allAttributes?: number
}

// TODO: variants counts (selected/all) from new design
export const AttributeHeader = ({
  attrStatus,
  className,
  chosenAttributes = 0,
  allAttributes = 0,
}: IAttributeHeaderProps): ReactElement => {
  const { tooltip, name, title, kind } = attrStatus

  const isFunc = kind === AttributeKinds.FUNC
  const isEnum = kind === AttributeKinds.ENUM

  return (
    <div className={cn('flex items-center', className)}>
      {isFunc && <FnLabel />}

      <span
        className={cn('text-16 font-bold cursor-pointer', isFunc && 'ml-1.5')}
      >
        {name || title}
      </span>

      {isEnum && (
        <span className="ml-1 text-grey-blue text-16 font-bold">
          (<span className="text-blue-bright">{chosenAttributes}</span>/
          {allAttributes})
        </span>
      )}

      {tooltip && (
        <Tooltip overlay={tooltip} placement="left" trigger={['click']}>
          <Icon name="Info" className="ml-1 text-grey-blue cursor-pointer" />
        </Tooltip>
      )}
    </div>
  )
}
