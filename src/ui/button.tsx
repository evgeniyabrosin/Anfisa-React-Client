import { ReactElement } from 'react'

interface Props {
  text: string
  className?: string
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
}: Props): ReactElement => (
  <button
    onClick={onClick}
    className={`flex items-center text-sm leading-4 rounded-full p-2 text-white bg-blue-bright ${className}`}
    ref={refEl}
  >
    {prepend}
    <span className="mx-2">{text}</span>
    {append}
  </button>
)
