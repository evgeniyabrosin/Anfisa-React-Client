import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

export interface ButtonProps {
  text?: string
  size?: 'xs' | 'sm' | 'md'
  disabled?: boolean
  hasBackground?: boolean
  isBlackText?: boolean
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
  hasBackground = true,
  isBlackText,
  onClick,
  className,
  append,
  prepend,
  icon,
  refEl,
  dataTestId,
}: ButtonProps): ReactElement => {
  let padding = ''
  const rounding = icon ? 'rounded' : 'rounded-full'
  const classNameString: string = cn(className)

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
      padding = 'px-2 ' + (hasBackground ? 'py-2' : 'py-1.5')
      break
  }

  const cnButton = cn(
    'flex items-center justify-center',
    padding,
    rounding,
    {
      'text-white': !isBlackText,
      'bg-blue-bright': !disabled && hasBackground && isDefaultBackground,
      'border-2 border-blue-bright': !hasBackground,
      'cursor-not-allowed': disabled,
      'bg-grey-light': disabled && hasBackground,
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
