import { ReactElement } from 'react'

interface Props {
	fill?: string
}

export const FolderSvg = ({fill}: Props): ReactElement => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M15.2065 3.44615L13.7513 7.09391C13.6935 7.24298 13.5418 7.34798 13.3874 7.34611H2.18757V20.5516H20.9482V3.46195L15.2065 3.44615Z" fill={fill || '#CCCCC'} />
			<path fillRule="evenodd" clipRule="evenodd" d="M2.16309 4.59837L2.17934 6.53993H13.1282L13.8965 4.61525L2.16309 4.59837Z" fill={fill || '#CCCCC'}/>
		</svg>
	)
}