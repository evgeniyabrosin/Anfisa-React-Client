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
    | 'primary-dark'
    | 'diestruction'
    | 'cancel'
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
  let padding = ''
  const classNameString: string = cn(className)
  const isPrimary = variant === 'primary'
  const isSecondary = variant === 'secondary'
  const isPrimaryDark = variant === 'primary-dark'
  const isSecondaryDark = variant === 'secondary-dark'
  const isDiestruction = variant === 'diestruction'
  const isCancel = variant === 'cancel'

  const isDefaultBackground: boolean =
    /bg-blue-bright/.test(classNameString) || !/bg-[\w-]*/.test(classNameString)

  const isSetRounded = /rounded/.test(classNameString)

  switch (size) {
    case 'xs':
      padding = 'py-0.5 ' + (text ? 'px-1' : 'px-0.5')
      break
    case 'sm':
      padding = 'py-1 ' + (text ? 'px-4' : 'px-1')
      break
    case 'md':
      padding = 'px-2 ' + (isPrimary || isPrimaryDark ? 'py-2' : 'py-1.5')
      break
  }

  const cnButton = cn(
    `flex items-center justify-between ${isSetRounded ? '' : 'rounded-full'}`,
    padding,
    {
      //default primary
      'bg-blue-bright':
        !disabled && (isPrimary || isPrimaryDark) && isDefaultBackground,
      'text-white': isPrimary || isSecondaryDark || isPrimaryDark,
      //hover primary
      'hover:bg-blue-hover': isPrimary || isPrimaryDark,
      'active:bg-blue-active': isPrimary || isPrimaryDark,
      //default secondary, diestruction
      'text-black': isSecondary,
      isDiestruction,
      //default secondary
      'border-2 border-blue-bright': isSecondary || isSecondaryDark,
      //hover secondary
      'hover:border-blue-hover': isSecondary || isSecondaryDark,
      'active:border-blue-active': isSecondary || isSecondaryDark,
      //default diestruction
      'border-2 border-red-secondary': isDiestruction,
      //hover diestruction
      'hover:border-red-hover': isDiestruction,
      'active:border-red-active': isDiestruction,
      //default cancel
      'border-2 border-grey-disabled': isCancel,
      //disabled general
      'cursor-not-allowed': disabled,
      'text-grey-blue': disabled,
      //disabled primary
      'bg-grey-disabled': disabled && (isPrimary || isPrimaryDark),
      'hover:bg-grey-disabled': disabled && (isPrimary || isPrimaryDark),
      'active:bg-grey-disabled': disabled && (isPrimary || isPrimaryDark),
      //disabled secondary
      'border-grey-disabled': disabled && (isDiestruction || isSecondaryDark),
      'hover:border-grey-disabled':
        disabled && (isSecondary || isSecondaryDark),
      'active:border-grey-disabled':
        disabled && (isSecondary || isSecondaryDark),
      //disabled diestruction
      'border-red-disabled': disabled && isDiestruction,
      'hover:border-red-disabled': disabled && isDiestruction,
      'active:border-red-disabled': disabled && isDiestruction,
    },
    className,
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
      className={cnButton}
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
