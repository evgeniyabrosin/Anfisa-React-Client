import { ReactElement } from 'react'
import { ModalBase } from '../../ui/modal-base'
import { IframeInfo } from './ifame-info'
import dirinfoStore from '../../store/dirinfo'
import { observer } from 'mobx-react-lite'

export const ModalInfo = observer((): ReactElement => (
	<ModalBase isOpen={!!dirinfoStore.infoFrameLink} close={() => dirinfoStore.setInfoFrameLink('')}>
		<IframeInfo />
	</ModalBase>
))