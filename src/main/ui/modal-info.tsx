import { ReactElement } from 'react'
import { ModalBase } from '../../ui/modal-base'
import { IframeInfo } from './iframe-info'
import dirinfoStore from '../../store/dirinfo'
import { observer } from 'mobx-react-lite'
import { Box } from '../../ui/box'
import styled from 'styled-components'
import { Text } from '../../ui/text'

const Description = styled(Box)`
	background-color: #F0F0F0;
	padding: 20px 63px 15px 63px;
	max-width: 900px;
	
`

export const ModalInfo = observer((): ReactElement => (
	<ModalBase isOpen={!!dirinfoStore.infoFrameLink} close={() => dirinfoStore.setInfoFrameLink('')}>
		<IframeInfo />

		<Description>
			<Text>
				{dirinfoStore.activeInfoName}
			</Text>
		</Description>
	</ModalBase>
))