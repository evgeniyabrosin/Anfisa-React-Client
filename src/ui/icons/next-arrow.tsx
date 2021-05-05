import { ReactElement } from 'react'

interface Props {
	fill?: string
}

export const NextArrowSvg = ({fill}: Props): ReactElement => {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M5 2L11 8L5 14" stroke={fill || 'white'} strokeWidth="2"/>
		</svg>

	)
}