import { ChangeEvent, ReactElement, useState } from 'react'
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
  const PART_FLOAT_REGEXP = /(0|[1-9][0-9]*)([.,])?([0-9]+)?/g
  const FLOAT_REGEXP = /(0|[1-9][0-9]*)(([.,])([0-9]+))?/g

  const { className, value, onChange, ...tempRest } = rest

  const [localValue, setLocalValue] = useState<string>(value.toString())

  const onChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const match = value.match(PART_FLOAT_REGEXP)
    const floatMatch = value.match(FLOAT_REGEXP)

    if (!value || (match?.length && match[0].length === value.length)) {
      setLocalValue(value.replaceAll(',', '.'))
    }

    if (
      !value ||
      (floatMatch?.length && floatMatch[0].length === value.length)
    ) {
      onChange(e)
    }
  }

  return (
    <input
      type="text"
      pattern="(0|[1-9][0-9]*)[\.,][0-9]+"
      className={cn('text-sm rounded leading-tight py-1.5 px-3', className)}
      value={localValue}
      onChange={onChangeLocal}
      {...tempRest}
    />
  )
}
