import { ChangeEvent, ReactElement } from 'react'
import { Argument } from 'classnames'

interface Props {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ ...rest }: Props): ReactElement => {
  const { className, ...tempRest } = rest

  return (
    <input
      type="text"
      className="text-sm rounded border border-grey-blue w-full leading-tight"
      style={{ padding: '6px 12px' }}
      {...tempRest}
    />
  )
}
