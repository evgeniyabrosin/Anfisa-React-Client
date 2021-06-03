import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

interface CardProps {
  children?: ReactElement | ReactNode
  className?: Argument
}

interface CardTitleProps {
  text: string
  className?: Argument
}

export const Card = ({ children, className }: CardProps): ReactElement => (
  <div className={cn('shadow-card p-4 rounded-lg', className)}>{children}</div>
)

export const CardTitle = ({
  text,
  className,
}: CardTitleProps): ReactElement => (
  <div
    className={cn('font-bold text-xl text-blue-dark leading-24px', className)}
  >
    {text}
  </div>
)
