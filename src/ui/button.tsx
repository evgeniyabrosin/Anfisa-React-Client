import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface Props {
  text: string
  className?: Argument
  onClick?: () => void
  append?: ReactElement
  prepend?: ReactElement
  refEl?: any
}

export const Button = ({
  text,
  onClick,
  className,
  append,
  prepend,
  refEl,
}: Props): ReactElement => {
  const cnButton = cn(
    'flex items-center text-sm leading-4 rounded-full p-2',
    {
      'text-white': true,
      'bg-blue-bright': true,
    },
    className,
  )

  return (
    <button onClick={onClick} className={cnButton} ref={refEl}>
      {prepend}
      <span className="mx-2">{text}</span>
      {append}
    </button>
  )
}
