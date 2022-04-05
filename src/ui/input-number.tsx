import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface Props {
  placeholder?: string
  disabled?: boolean
  value: string | number
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  min?: number
  max?: number
}

export const InputNumber = ({ ...rest }: Props): ReactElement => {
  const { className, ...tempRest } = rest

  return (
    <input
      type="number"
      className={cn('text-sm rounded leading-tight py-1.5 px-3', className)}
      {...tempRest}
    />
  )
}
