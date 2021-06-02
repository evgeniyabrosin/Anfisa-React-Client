import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { theme } from '@theme'
import { LoupeSvg } from '@icons/loupe'
import { Input } from '@ui/input'

interface Props {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputSearch = ({ ...rest }: Props): ReactElement => {
  const { className, ...tempRest } = rest

  return (
    <div className={cn('relative', className)}>
      <Input {...tempRest} />

      {/* TODO tailwind refactor */}
      <LoupeSvg
        style={{ position: 'absolute', top: 8, right: 8 }}
        fill={theme('colors.grey.blue')}
      />
    </div>
  )
}
