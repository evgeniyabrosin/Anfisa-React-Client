import { observer } from 'mobx-react-lite'

import { PopperButton } from '@components/popper-button'
import { OpenViewerBaseButton } from '@pages/main/components/selected-dataset/components/open-viewer-button/components/open-viewer-base-button'
import { OpenViewerPanel } from '@pages/main/components/selected-dataset/components/open-viewer-button/components/open-viewer-panel'

export const OpenViewerButton = observer(() => {
  return (
    <PopperButton
      ButtonElement={OpenViewerBaseButton}
      ModalElement={OpenViewerPanel}
    />
  )
})
