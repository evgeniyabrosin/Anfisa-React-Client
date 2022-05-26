import styles from './button.module.css'

import { FC, MouseEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { camelCase } from 'lodash'
import { CSSProperties } from 'styled-components'

export interface IButtonProps {
  text?: string | JSX.Element
  textSize?: 'xs' | 'sm'
  size?: 'xs' | 'sm' | 'md'
  disabled?: boolean
  variant?:
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
  append?: ReactElement
  prepend?: ReactElement
  icon?: ReactElement
  refEl?: any
  dataTestId?: string
  style?: CSSProperties
}

export const Button: FC<IButtonProps> = ({
  text,
  textSize = 'sm',
  size = 'sm',
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

  const buttonSize = isOnlyIcon
    ? styles[`button_icon_only_${size}`]
    : variant === 'secondary-dark' ||
      variant === 'diestruction' ||
      variant === 'secondary'
    ? styles[`button_secondarySize_${size}`]
    : styles[`button_${size}`]

  const buttonStyles = cn(
    className,
    styles.button,
    isOnlyIcon && styles.button_icon_only,
    buttonSize,
    styles[`button_${camelCase(variant)}`],
  )

  const textStyle = cn(
    styles[`button_text_${textSize}`],
    prepend && styles.button_text_left,
    (icon || append) && styles.button_text_right,
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
