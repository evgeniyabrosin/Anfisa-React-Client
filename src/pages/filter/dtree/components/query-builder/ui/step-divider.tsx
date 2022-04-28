import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface IStepDividerProps {
  className?: Argument
  outer?: boolean
}

export const StepDivider = ({
  className,
  outer,
}: IStepDividerProps): ReactElement =>
  outer ? (
    <div
      className={cn('w-full bg-white h-2 border-l border-white', className)}
    />
  ) : (
    <div className={cn('bg-grey-light w-full h-px px-5', className)} />
  )
