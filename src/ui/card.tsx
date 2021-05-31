import { ReactElement, ReactNode } from 'react'

interface Props {
  children?: ReactElement | ReactNode
  className?: string
}

const cardStyle = {
  boxShadow: '0px 2px 8px rgba(167, 167, 167, 0.25)',
}

export const Card = ({ children, className }: Props): ReactElement => (
  <div style={cardStyle} className={`p-4 rounded-lg my-4 mx-2 ${className}`}>
    {children}
  </div>
)
