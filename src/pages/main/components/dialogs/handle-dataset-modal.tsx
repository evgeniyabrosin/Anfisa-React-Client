import noop from 'lodash/noop'
import { observer } from 'mobx-react-lite'

import {
  IPopperMenuProps,
  PopperMenu,
} from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import handleDatasetStore from '../handle-dataset/handle-dataset.store'

export const HandleDatasetModal = observer(({ close }: IPopperMenuProps) => {
  return (
    <PopperMenu close={close} className="w-32">
      <PopperMenuItem
        onClick={() => {
          handleDatasetStore.toggleImportModal(true)
          close()
        }}
        iconName="Import"
      >
        Import
      </PopperMenuItem>
      <PopperMenuItem
        isDisabled={handleDatasetStore.isExportDisabled}
        onClick={
          !handleDatasetStore.isExportDisabled
            ? () => {
                handleDatasetStore.toggleExportModal(true)
                close()
              }
            : noop
        }
        iconName="Export"
      >
        Export
      </PopperMenuItem>
    </PopperMenu>
  )
})
