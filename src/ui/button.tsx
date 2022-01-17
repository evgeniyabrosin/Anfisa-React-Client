import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

export interface ButtonProps {
  text?: string
  size?: 'xs' | 'sm' | 'md'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'secondary-dark' | 'primary-dark'
  className?: Argument
  onClick?: () => void
  append?: ReactElement
  prepend?: ReactElement
  icon?: ReactElement
  refEl?: any
  dataTestId?: string
}

export const Button = ({
  text,
  size = 'md',
  disabled = false,
  variant = 'primary',
  onClick,
  className,
  append,
  prepend,
  icon,
  refEl,
  dataTestId,
}: ButtonProps): ReactElement => {
  let padding = ''
  const classNameString: string = cn(className)
  const isPrimary = variant === 'primary'
  const isSecondary = variant === 'secondary'
  const isPrimaryDark = variant === 'primary-dark'
  const isSecondaryDark = variant === 'secondary-dark'

  const isDefaultBackground: boolean =
    /bg-blue-bright/.test(classNameString) || !/bg-[\w-]*/.test(classNameString)

  switch (size) {
    case 'xs':
      padding = 'py-0.5 ' + (text ? 'px-1' : 'px-0.5')
      break
    case 'sm':
      padding = 'py-1 ' + (text ? 'px-2' : 'px-1')
      break
    case 'md':
      padding = 'px-2 ' + (isPrimary || isPrimaryDark ? 'py-2' : 'py-1.5')
      break
  }

  const cnButton = cn(
    'flex items-center justify-center rounded-full',
    padding,
    {
      //default primary
      'bg-blue-bright':
        !disabled && (isPrimary || isPrimaryDark) && isDefaultBackground,
      'text-white': isPrimary || isSecondaryDark || isPrimaryDark,
      //hover primary
      'hover:bg-blue-hover': isPrimary || isPrimaryDark,
      'active:bg-blue-active': isPrimary || isPrimaryDark,
      //default secondary
      'border-2 border-blue-bright': isSecondary || isSecondaryDark,
      'text-black': isSecondary,
      //hover secondary
      'hover:border-blue-hover': isSecondary || isSecondaryDark,
      'active:border-blue-active': isSecondary || isSecondaryDark,
      //disabled general
      'cursor-not-allowed': disabled,
      'text-grey-blue': disabled,
      //disabled primary
      'bg-grey-disabled': disabled && (isPrimary || isPrimaryDark),
      'hover:bg-grey-disabled': disabled && (isPrimary || isPrimaryDark),
      'active:bg-grey-disabled': disabled && (isPrimary || isPrimaryDark),
      //disabled secondary
      'border-grey-disabled': disabled && (isSecondary || isSecondaryDark),
      'hover:border-grey-disabled':
        disabled && (isSecondary || isSecondaryDark),
      'active:border-grey-disabled':
        disabled && (isSecondary || isSecondaryDark),
    },
    className,
  )

  const clickHandler = () => {
    !disabled && onClick && onClick()
  }

  return (
    <button
      data-testid={dataTestId}
      disabled={disabled}
      className={cnButton}
      ref={refEl}
      onClick={clickHandler}
    >
      {prepend}
      {text && <span className="mx-2 text-xs leading-14px">{text}</span>}
      {icon}
      {append}
    </button>
  )
}
