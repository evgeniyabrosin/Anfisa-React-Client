import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

interface CardProps {
  children?: ReactElement | ReactNode
  className?: Argument
}

interface CardTitleProps {
  text: string
  size?: 'md' | 'sm'
  className?: Argument
}

export const Card = ({ children, className }: CardProps): ReactElement => (
  <div className={cn('shadow-card p-4 rounded-lg', className)}>{children}</div>
)

export const CardTitle = ({
  text,
  className,
  size = 'md',
}: CardTitleProps): ReactElement => {
  const sizeClass =
    size === 'md'
      ? 'text-xl text-blue-dark leading-24px font-bold'
      : 'text-sm text-black leading-16px mb-3'

  return <div className={cn(sizeClass, className)}>{text}</div>
}
