import styles from './button.module.css'

import { MouseEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { CSSProperties } from 'styled-components'

export interface ButtonProps {
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

export const Button = ({
  text,
  textSize = 'sm',
  size = 'md',
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
}: ButtonProps): ReactElement => {
  const isSecondary = variant === 'secondary'
  const isPrimaryDark = variant === 'primary-dark'
  const isSecondaryDark = variant === 'secondary-dark'
  const isDiestruction = variant === 'diestruction'
  const isOnlyIcon = icon && !append && !prepend && !text

  const stylesButton = isOnlyIcon
    ? cn(
        styles.button_icon_only,
        size === 'md' && styles.button_icon_only_l,
        size === 'xs' && styles.button_icon_only_s,
      )
    : cn(
        size === 'md' && styles.button_l,
        size === 'sm' && styles.button_m,
        size === 'xs' && styles.button_s,
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
      className={cn(
        className,
        styles.button,
        isDiestruction && styles.button_diestruction,
        isSecondary && styles.button_secondary,
        isPrimaryDark && styles.button_dark,
        isSecondaryDark && styles.button_secondary_dark,
        stylesButton,
      )}
      ref={refEl}
      onClick={clickHandler}
      onMouseUp={onMouseUpHandler}
      onMouseDown={onMouseDownHandler}
      style={style}
    >
      {prepend}
      {text && (
        <span className={`mx-1 text-${textSize} leading-14px`}>{text}</span>
      )}
      {icon}
      {append}
    </button>
  )
}
