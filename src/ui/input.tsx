import { ChangeEvent, CSSProperties, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface Props {
  placeholder?: string
  value: string
  className?: Argument
  style?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ ...rest }: Props): ReactElement => {
  const { className, style, ...tempRest } = rest

  const classNameString: string = cn(className)

  const isDefaultBorder: boolean =
    /border-grey-blue/.test(classNameString) ||
    !/bg-[\w-]*/.test(classNameString)

  return (
    <input
      type="text"
      className={cn(
        'text-sm rounded border w-full leading-tight py-1.5 px-3',
        {
          'border-grey-blue': isDefaultBorder,
        },
        className,
      )}
      style={style}
      {...tempRest}
    />
  )
}
