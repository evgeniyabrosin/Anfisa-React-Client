import { FC, memo } from 'react'
import cn, { Argument } from 'classnames'
import Tooltip from 'rc-tooltip'

export interface IUnitsListUnitNameProps {
  className: Argument
  name: string
  tooltip?: string
  onClick: () => void
}

// eslint-disable-next-line react/display-name
export const UnitsListUnitName: FC<IUnitsListUnitNameProps> = memo(
  ({ tooltip, name, className, onClick }) => {
    const nameElement = (
      <span className={cn(className)} onClick={onClick}>
        {name}
      </span>
    )

    return !tooltip ? (
      nameElement
    ) : (
      <Tooltip
        overlay={tooltip}
        placement="topLeft"
        trigger="hover"
        mouseEnterDelay={0.7}
      >
        {nameElement}
      </Tooltip>
    )
  },
)
