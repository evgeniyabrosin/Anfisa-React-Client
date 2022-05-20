import styles from './units-list-controls.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { InputSearch } from '@components/input-search'

interface IUnitsListControlsProps {
  className?: string
  filterValue: string
  onFilterValueChange: (value: string) => void
  onExpand: () => void
  onCollapse: () => void
}

export const UnitsListControls = ({
  className,
  filterValue,
  onFilterValueChange,
  onExpand,
  onCollapse,
}: IUnitsListControlsProps): ReactElement => {
  return (
    <div className={cn(styles.controls, className)}>
      <InputSearch
        className={styles.controls__search}
        placeholder={t('filter.searchForAField')}
        value={filterValue}
        onChange={e => onFilterValueChange(e.target.value)}
      />
      <button className={styles.controls__button} onClick={onExpand}>
        <Icon name="Expand" size={20} />
      </button>
      <button className={styles.controls__button} onClick={onCollapse}>
        <Icon name="Collapse" size={20} />
      </button>
    </div>
  )
}
