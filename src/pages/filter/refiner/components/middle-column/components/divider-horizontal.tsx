import { FC } from 'react'
import cn, { Argument } from 'classnames'

interface IDividerHorizontalProp {
  className?: Argument
}

export const DividerHorizontal: FC<IDividerHorizontalProp> = ({
  className,
}) => <div className={cn('bg-grey-light h-px w-full my-4', className)} />
