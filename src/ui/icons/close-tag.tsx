import { ReactElement } from 'react'

interface Props {
    onClick?: () => void
}

export const CloseTagSvg = ({onClick}: Props): ReactElement => {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick} cursor="pointer">
			<rect x="2.66675" y="2.66663" width="10.6667" height="10.6667" rx="5.33333" fill="#F1F3F4"/>
			<path d="M10.6666 5.87052L10.1294 5.33337L7.99992 7.4629L5.87039 5.33337L5.33325 5.87052L7.46278 8.00004L5.33325 10.1296L5.87039 10.6667L7.99992 8.53718L10.1294 10.6667L10.6666 10.1296L8.53706 8.00004L10.6666 5.87052Z" fill="#78909C"/>
		</svg>
		
	)
}