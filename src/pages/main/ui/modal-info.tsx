import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import dirinfoStore from '@store/dirinfo'
import { Box } from '@ui/box'
import { ModalBase } from '@ui/modal-base'
import { Text } from '@ui/text'
import { IframeInfo } from './iframe-info'

const Description = styled(Box)`
  background-color: #f0f0f0;
  padding: 20px 63px 15px 63px;
  max-width: 900px;
`

export const ModalInfo = observer(
  (): ReactElement => (
    <ModalBase
      isOpen={!!dirinfoStore.infoFrameLink}
      close={() => dirinfoStore.setInfoFrameLink('')}
    >
      <IframeInfo />

      <Description>
        <Text>{dirinfoStore.activeInfoName}</Text>
      </Description>
    </ModalBase>
  ),
)
