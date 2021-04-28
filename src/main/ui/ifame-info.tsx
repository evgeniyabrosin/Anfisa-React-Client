import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import { Box } from '../../ui/box'
import dirinfoStore from '../../store/dirinfo'
import styled from 'styled-components'

const Root = styled(Box)`
	height: 900px;
	max-width: 1300px;
	min-width: 1000px;
	padding: 10px;
`

export const IframeInfo = observer((): ReactElement =>  (
	<Root>
		<iframe 
			src={dirinfoStore.infoFrameLink} 
			frameBorder="0"
			height="100%"
			width="100%"
		/>
	</Root>
)
)
