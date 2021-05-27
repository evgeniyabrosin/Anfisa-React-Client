import { CSSProperties, ReactElement, ReactNode } from 'react'

import { ANYType } from '@declarations'

interface Props {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  refEl?: ANYType
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
