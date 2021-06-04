import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { ModalBase } from '@ui/modal-base'
import { IframeInfo } from './iframe-info'

export const ModalInfo = observer(
  (): ReactElement => (
    <ModalBase
      isOpen={dirinfoStore.infoFrameModalVisible}
      close={() => dirinfoStore.setInfoFrameModalVisible(false)}
    >
      <div className="flex flex-col min-h-full" style={{ width: '900px' }}>
        <div className="p-4 bg-grey-6 text-center">
          {dirinfoStore.activeInfoName}
        </div>

        <IframeInfo />
      </div>
    </ModalBase>
  ),
)
