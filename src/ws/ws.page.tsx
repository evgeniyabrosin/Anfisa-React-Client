import { ReactElement, useEffect } from 'react'
import { Box } from '../ui/box'
import dsStore from '../store/dataset'
import { WsHeader } from './ws.header'
import styled from 'styled-components'
import { useParams } from '../core/hooks/use-params'
import { TableVariants } from './ui/table-variants'
import { ControlPanel } from './ui/control-panel'

const Root = styled(Box)`
	padding: 38px 20px 0px 30px;
`

export const WSPage = (): ReactElement => {
	const params = useParams()
	
	useEffect(() => {
		dsStore.fetchDsStat(params.get('ds'))
		// dsStore.fetchWsList(params.get('ds'))
		dsStore.fetchReccnt(params.get('ds'))
		dsStore.fetchTabReport(params.get('ds'))
		dsStore.fetchWsTags(params.get('ds'))
	}, [])

	return (
		<Root>
			<WsHeader />
			<ControlPanel />
			<TableVariants />
		</Root>
	)
}