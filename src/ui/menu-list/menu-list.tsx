import styles from './menu-list.module.css'

import React, { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { MenuListItem } from '@ui/menu-list/menu-list-item'

interface IMenuListProps {
  className?: string
  wrap?: 'normal' | 'nowrap'
  isDense?: boolean
  children: ReactNode
}

export const MenuList = ({
  className,
  wrap = 'normal',
  isDense,
  children,
}: IMenuListProps): ReactElement => {
  return (
    <div role="menu" className={cn(styles.menuList, className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === MenuListItem) {
          return React.cloneElement(child, {
            ...child.props,
            isDense: child.props.isDense ?? isDense,
            wrap: child.props.wrap ?? wrap,
          })
        }
        return child
      })}
    </div>
  )
}
