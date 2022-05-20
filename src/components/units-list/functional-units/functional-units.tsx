import styles from './functional-units.module.css'

import { ReactElement, useRef, useState } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { TFunctionalUnit } from '@store/stat-units'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { FnLabel } from '@components/fn-label'
import { TFunctionalCondition } from '@components/units-list'
import { TPropertyStatus } from '@service-providers/common'

interface IFunctionalUnitsProps {
  className?: string
  units: TFunctionalUnit[]
  onSelect: (unit: TPropertyStatus) => void
  conditions?: TFunctionalCondition[]
  onConditionSelect?: (condition: TFunctionalCondition) => void
  onConditionDelete?: (condition: TFunctionalCondition) => void
}

export const FunctionalUnits = ({
  className,
  units,
  onSelect,
  conditions,
  onConditionSelect,
  onConditionDelete,
}: IFunctionalUnitsProps): ReactElement => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className={className}>
        <div ref={titleRef} className={styles.title}>
          <FnLabel className="mr-2" />
          <span className={styles.title}>{t('unitsList.functionalUnits')}</span>
          <button
            className={styles.title__button}
            onClick={() => setMenuOpen(true)}
          >
            +
          </button>
        </div>
        {conditions?.map(condition => (
          <div
            key={condition.key}
            className={cn(
              styles.condition,
              condition.isActive && styles.condition_active,
            )}
          >
            <span
              className={styles.condition__label}
              onClick={() => onConditionSelect?.(condition)}
            >
              {condition.name}
            </span>
            <button
              className={styles.condition__deleteButton}
              onClick={() => onConditionDelete?.(condition)}
            >
              <span>×</span>
            </button>
          </div>
        ))}
      </div>
      <Popover
        isOpen={isMenuOpen}
        anchorEl={titleRef.current}
        onClose={closeMenu}
      >
        <MenuList className={styles.menu}>
          {units.map(unit => (
            <MenuListItem
              key={unit.name}
              label={unit.name}
              onClick={() => {
                onSelect(unit)
                closeMenu()
              }}
            />
          ))}
        </MenuList>
      </Popover>
    </>
  )
}
