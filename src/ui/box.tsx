import { CSSProperties, ReactElement, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  refEl?: any
  onClick?: () => void
}

export const Box = ({
  children,
  style,
  className,
  onClick,
  refEl,
}: Props): ReactElement => (
  <div style={style} className={className} onClick={onClick} ref={refEl}>
    {children}
  </div>
)
