import { CSSProperties, ReactElement, ReactNode } from 'react'

interface Props {
    children?: ReactElement | string | ReactNode
	style?: CSSProperties
	className?: string
}

export const Text = ({children, style, className}: Props): ReactElement => {
	return (
		<p style={style} className={className}>{children}</p>
	)
}