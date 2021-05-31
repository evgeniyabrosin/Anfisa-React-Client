import { ReactElement, ReactNode } from 'react'

interface CardProps {
  children?: ReactElement | ReactNode
  className?: string
}

interface CardTitleProps {
  text: string
  className?: string
}

const cardStyle = {
  boxShadow: '0px 2px 8px rgba(167, 167, 167, 0.25)',
}

export const Card = ({ children, className }: CardProps): ReactElement => (
  <div style={cardStyle} className={`p-4 rounded-lg my-4 mx-2 ${className}`}>
    {children}
  </div>
)

export const CardTitle = ({
  text,
  className,
}: CardTitleProps): ReactElement => (
  <div
    className={`font-bold text-xl text-blue-dark leading-tight ${className}`}
  >
    {text}
  </div>
)
