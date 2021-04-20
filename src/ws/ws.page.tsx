import { ReactElement, useEffect } from 'react'
import { Box } from '../ui/box'
import dsStore from '../store/dataset'
import { WsHeader } from './ws.header'
import styled from 'styled-components'
import { useParams } from '../core/hooks/use-params'

const Root = styled(Box)`
	padding: 38px 20px 0px 30px;
`

export const WSPage = (): ReactElement => {
	const params = useParams()
	
	useEffect(() => {
		dsStore.fetchDsStat(params.get('ds'))
	}, [])

	return (
		<Root>
			<WsHeader />
		</Root>
	)
}