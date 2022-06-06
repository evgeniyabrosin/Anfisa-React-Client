import styles from './units-list-unit.module.css'

import { ReactElement, useCallback, useState } from 'react'
import cn, { Argument } from 'classnames'

import { TUnit } from '@store/stat-units'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { AttributeKinds } from '@service-providers/common'
import { UnitChart } from '../unit-chart'
import { UnitsListUnitName } from './components/units-list-unit-name'

interface IUnitsListUnitProps {
  className?: Argument
  isDark: boolean
  withChart: boolean
  unit: TUnit
  onSelect: () => void
}

export const UnitsListUnit = ({
  className,
  isDark,
  withChart,
  unit,
  onSelect,
}: IUnitsListUnitProps): ReactElement => {
  const { kind, name, tooltip } = unit
  const [isChartVisible, setChartVisible] = useState(false)

  const hasChart =
    withChart &&
    ((kind === AttributeKinds.ENUM &&
      unit.variants &&
      unit.variants.length > 0) ||
      (kind === AttributeKinds.NUMERIC &&
        unit.histogram &&
        unit.histogram.length > 0))

  const onClickUnitName = useCallback(
    () => setChartVisible(!!hasChart && !isChartVisible),
    [hasChart, isChartVisible],
  )

  return (
    <div className={cn(styles.unit, className)}>
      <div className={styles.unitTitle}>
        <button className={styles.unitTitle__addButton} onClick={onSelect}>
          +
        </button>
        {unit.power && (
          <PredictionPowerIndicator
            className={styles.unitTitle__power}
            value={unit.power.value}
            comment={unit.power.comment}
          />
        )}
        <UnitsListUnitName
          tooltip={tooltip}
          name={name}
          onClick={onClickUnitName}
          className={cn(
            styles.unitTitle__title,
            isDark && styles.unitTitle__title_dark,
          )}
        />
      </div>
      {hasChart && isChartVisible && <UnitChart className="mt-2" unit={unit} />}
    </div>
  )
}
