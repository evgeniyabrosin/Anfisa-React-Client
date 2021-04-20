import { ReactElement } from 'react'

interface Props {
	fill?: string
}

export const DocSvg = ({fill}: Props): ReactElement => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
			<path d="M8.18506 4.19996L5.77734 6.49964H8.18506V4.19996Z" fill={fill || '#CCCCCC'}/>
			<path d="M9.14784 4.00034V7.50098H5.77686V20.0007H17.3324L17.3333 4.00034H9.14784ZM14.9256 16.9997H8.1855V15.9994H14.9265L14.9256 16.9997ZM14.9256 14.5003H8.1855V13.5H14.9265L14.9256 14.5003ZM14.9256 12H8.1855V10.9997H14.9265L14.9256 12Z" fill={fill || '#CCCCCC'}/>
		</svg>

	)
}