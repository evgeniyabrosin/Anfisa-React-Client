import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface Props {
  text?: string
  size?: 'sm' | 'md'
  className?: Argument
  onClick?: () => void
  append?: ReactElement
  prepend?: ReactElement
  icon?: ReactElement
  refEl?: any
}

export const Button = ({
  text,
  size,
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
      padding = 'p-1'
      break
    case 'md':
      padding = 'p-2'
      break
  }

  const cnButton = cn(
    'flex items-center',
    padding,
    rounding,
    {
      'text-white': true,
      'bg-blue-bright': isDefaultBackground,
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
