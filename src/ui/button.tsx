import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface Props {
  text?: string
  size?: 'sm' | 'md'
  hasBackground?: boolean
  className?: Argument
  onClick?: () => void
  append?: ReactElement
  prepend?: ReactElement
  icon?: ReactElement
  refEl?: any
}

export const Button = ({
  text,
  size = 'md',
  hasBackground = true,
  onClick,
  className,
  append,
  prepend,
  icon,
  refEl,
}: Props): ReactElement => {
  let padding = ''
  const rounding = icon ? 'rounded' : 'rounded-full'
  const classNameString: string = cn(className)

  const isDefaultBackground: boolean =
    /bg-blue-bright/.test(classNameString) || !/bg-[\w-]*/.test(classNameString)

  switch (size) {
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
      'text-white': true,
      'bg-blue-bright': hasBackground && isDefaultBackground,
      'border-2 border-blue-bright': !hasBackground,
    },
    className,
  )

  return (
    <button onClick={onClick} className={cnButton} ref={refEl}>
      {prepend}
      {text && <span className="mx-2 text-xs leading-14px">{text}</span>}
      {icon}
      {append}
    </button>
  )
}
