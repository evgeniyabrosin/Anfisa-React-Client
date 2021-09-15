import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface IProps {
  className?: Argument
  outer?: boolean
}

export const StepDivider = ({ className, outer }: IProps): ReactElement =>
  outer ? (
    <div
      className={cn('w-full bg-white h-2 border-l border-white', className)}
    />
  ) : (
    <div className={cn('bg-grey-blue w-full h-px px-5', className)} />
  )
