import { CSSProperties, ReactElement, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

export const Box = ({children, style, className}: Props): ReactElement => {
	return <div style={style} className={className}>{children}</div>
}