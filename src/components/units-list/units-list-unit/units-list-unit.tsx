import styles from './units-list-unit.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'

import { TUnit } from '@store/stat-units'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { AttributeKinds } from '@service-providers/common'
import { UnitChart } from '../unit-chart'

interface IUnitsListUnitProps {
  className?: string
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
  const { kind, name } = unit
  const [isChartVisible, setChartVisible] = useState(false)

  const hasChart =
    withChart &&
    ((kind === AttributeKinds.ENUM &&
      unit.variants &&
      unit.variants.length > 0) ||
      (kind === AttributeKinds.NUMERIC &&
        unit.histogram &&
        unit.histogram.length > 0))

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

        <span
          className={cn(
            styles.unitTitle__title,
            isDark && styles.unitTitle__title_dark,
          )}
          onClick={() => setChartVisible(!!hasChart && !isChartVisible)}
        >
          {name}
        </span>
      </div>
      {hasChart && isChartVisible && <UnitChart className="mt-2" unit={unit} />}
    </div>
  )
}
