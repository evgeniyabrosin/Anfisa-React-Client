import { ChangeEvent, CSSProperties, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface Props {
  placeholder?: string
  value: string | number
  className?: Argument
  style?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputNumber = ({ ...rest }: Props): ReactElement => {
  const { className, style, ...tempRest } = rest

  return (
    <input
      type="number"
      className={cn(
        'text-sm rounded w-full leading-tight py-1.5 px-3',
        className,
      )}
      style={style}
      {...tempRest}
    />
  )
}
