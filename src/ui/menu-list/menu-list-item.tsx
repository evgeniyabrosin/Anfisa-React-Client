import styles from './menu-list.module.css'

import React, { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

interface IMenuListItemProps {
  className?: string
  isDense?: boolean
  wrap?: 'normal' | 'nowrap'
  isSelected?: boolean
  label: ReactNode
  actions?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const stopPropagation = (event: React.MouseEvent) => event.stopPropagation()

export const MenuListItem = ({
  className,
  wrap,
  isDense,
  isSelected,
  label,
  actions,
  onClick,
}: IMenuListItemProps): ReactElement => {
  return (
    <div
      tabIndex={-1}
      role="menuitem"
      className={cn(
        styles.menuListItem,
        isDense && styles.menuListItem_dense,
        isSelected && styles.menuListItem_selected,
        className,
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          styles.menuListItem__label,
          wrap === 'nowrap' && styles.menuListItem__label_nowrap,
        )}
      >
        {label}
      </span>
      {actions && (
        <span
          className={styles.menuListItem__actions}
          onClick={stopPropagation}
        >
          {actions}
        </span>
      )}
    </div>
  )
}
