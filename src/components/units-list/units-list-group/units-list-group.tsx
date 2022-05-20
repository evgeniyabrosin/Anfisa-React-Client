import styles from './units-list-group.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { TUnitGroup } from '@store/stat-units'
import { DropdownArrow } from '@ui/dropdown-arrow'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { TPropertyStatus } from '@service-providers/common'
import { UnitsListUnit } from '../units-list-unit'

interface IUnitsListGroupProps {
  className?: string
  isCollapsed: boolean
  isDark: boolean
  withCharts: boolean
  unitsGroup: TUnitGroup
  onCollapsedChange: (isCollapsed: boolean, name: string) => void
  onSelect: (unit: TPropertyStatus) => void
}

export const UnitsListGroup = ({
  className,
  isCollapsed,
  isDark,
  withCharts,
  unitsGroup,
  onCollapsedChange,
  onSelect,
}: IUnitsListGroupProps): ReactElement => {
  const { power, name, units } = unitsGroup

  return (
    <div className={className}>
      <div
        onClick={() => onCollapsedChange(!isCollapsed, name)}
        className={cn(
          styles.groupHeader,
          isDark && styles.groupHeader_dark,
          isCollapsed && styles.groupHeader_collapsed,
        )}
      >
        {power !== undefined && (
          <PredictionPowerIndicator className="mr-2" value={power} />
        )}
        <span className={styles.groupHeader__title}>{name}</span>
        <DropdownArrow isOpen={!isCollapsed} />
      </div>
      {!isCollapsed &&
        units.map(unit => (
          <UnitsListUnit
            key={unit.name}
            unit={unit}
            isDark={isDark}
            withChart={withCharts}
            onSelect={() => onSelect(unit)}
          />
        ))}
    </div>
  )
}
