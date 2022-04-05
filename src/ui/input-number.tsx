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
  const { className, value, onChange, ...tempRest } = rest

  const onChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.value.match(/(0|[1-9][0-9]*)(([.,])([0-9]+))?/)?.length) {
      onChange(e) // 0, -> 0
    }
  }

  return (
    <input
      type="text"
      pattern="(0|[1-9][0-9]*)[\.,][0-9]+"
      className={cn('text-sm rounded leading-tight py-1.5 px-3', className)}
      value={value}
      onChange={onChangeLocal}
      {...tempRest}
    />
  )
}
