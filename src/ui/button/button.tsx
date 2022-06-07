import styles from './button.module.css'

import { FC, MouseEvent, ReactNode } from 'react'
import cn, { Argument } from 'classnames'
import { CSSProperties } from 'styled-components'

export interface IButtonProps {
  text?: ReactNode
  textSize?: 'xs' | 'sm'
  size?: 'xs' | 'sm' | 'md'
  padding?: 'normal' | 'dense'
  disabled?: boolean
  variant?:
    | 'text'
    | 'primary'
    | 'secondary'
    | 'secondary-dark'
    | 'tertiary'
    | 'primary-dark'
    | 'diestruction'
  className?: Argument
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onMouseUp?: (event: MouseEvent<HTMLButtonElement>) => void
  onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void
  append?: ReactNode
  prepend?: ReactNode
  icon?: ReactNode
  refEl?: any
  dataTestId?: string
  style?: CSSProperties
}

export const Button: FC<IButtonProps> = ({
  text,
  textSize,
  size = 'sm',
  padding = 'normal',
  disabled = false,
  variant = 'primary',
  onClick,
  onMouseUp,
  onMouseDown,
  className,
  append,
  prepend,
  icon,
  refEl,
  dataTestId,
  style = {},
}) => {
  const isOnlyIcon = icon && !append && !prepend && !text

  const buttonStyles = cn(
    styles.button,
    styles[`button_${size}`],
    styles[`button_${variant}`],
    styles[`button_${padding}`],
    isOnlyIcon && styles.button_iconOnly,
    className,
  )

  const textStyle = cn(
    styles.button__text,
    styles[`button__text_${textSize ?? size}`],
    prepend && styles.button__text_left,
    (icon || append) && styles.button__text_right,
  )

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    !disabled && onClick && onClick(event)
  }

  const onMouseUpHandler = (event: MouseEvent<HTMLButtonElement>) => {
    !disabled && onMouseUp && onMouseUp(event)
  }

  const onMouseDownHandler = (event: MouseEvent<HTMLButtonElement>) => {
    !disabled && onMouseDown && onMouseDown(event)
  }

  return (
    <button
      data-testid={dataTestId}
      disabled={disabled}
      className={buttonStyles}
      ref={refEl}
      onClick={clickHandler}
      onMouseUp={onMouseUpHandler}
      onMouseDown={onMouseDownHandler}
      style={style}
    >
      {prepend}
      {text && <span className={textStyle}>{text}</span>}
      {icon}
      {append}
    </button>
  )
}
