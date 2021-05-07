import { CSSProperties, ReactElement, ReactNode } from 'react'

interface Props {
  children?: ReactElement | string | ReactNode
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

export const Text = ({
  children,
  style,
  className,
  onClick,
}: Props): ReactElement => {
  return (
    <p style={style} className={className} onClick={onClick}>
      {children}
    </p>
  )
}
