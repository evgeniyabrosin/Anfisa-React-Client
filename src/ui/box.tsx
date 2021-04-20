import { CSSProperties, ReactElement, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    className?: string
    style?: CSSProperties
    onClick?: () => void
}

export const Box = ({children, style, className, onClick}: Props): ReactElement => {
	return <div style={style} className={className} onClick={onClick}>{children}</div>
}