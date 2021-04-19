import { CSSProperties, ReactElement, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

export const Box = ({children, style, className, ...rest}: Props): ReactElement => {
	return <div style={style} className={className} {...rest}>{children}</div>
}