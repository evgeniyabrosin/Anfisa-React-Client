import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'
import { Input } from '@ui/input'

interface Props {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  filter?: boolean
}

export const InputSearch = ({ ...rest }: Props): ReactElement => {
  const { className, filter, ...tempRest } = rest

  return (
    <div className={cn('relative', className)}>
      <Input
        className={cn({
          'outline-none rounded-2xl': filter,
        })}
        {...tempRest}
      />

      <Icon name="Loupe" className="text-grey-blue absolute top-2 right-2" />
    </div>
  )
}
