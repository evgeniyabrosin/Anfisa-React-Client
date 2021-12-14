import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import datasetStore from '@store/dataset'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { FilterRefinerGroups } from '@pages/filter/ui/filter-refiner-groups'
import { QuerySelected } from '@pages/filter/ui/query-selected'
import { SelectedGroup } from '@pages/filter/ui/selected-group'
import { FilterControlRefiner } from '../../filter/ui/filter-control-refiner'

const ModalView = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
`

const ModalContent = styled.div`
  width: 95%;
  height: 95%;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
`

export const ModalRefiner = observer(() => {
  return (
    <ModalView className="bg-grey-blue">
      <ModalContent className="flex flex-col pt-4 box-border px-4 bg-white rounded-lg overflow-y-hidden">
        <ModalHeader>
          <div>Choose conditions</div>
          <Icon
            name="Close"
            size={16}
            onClick={() => datasetStore.hideModalRefiner()}
            className="cursor-pointer"
          />
        </ModalHeader>

        <div className="flex bg-blue-dark px-4 h-16">
          <FilterControlRefiner source="modal" />

          <div className="flex mt-8 ml-3">
            <Button
              text="Undo"
              className="ml-2 hover:bg-blue-bright"
              hasBackground={false}
              // disabled={isUndoLocked}
              // onClick={() => moveActionHistory(-1)}
            />
            <Button
              text="Redo"
              className="ml-2 hover:bg-blue-bright"
              hasBackground={false}
              // disabled={isRedoLocked}
              // onClick={() => moveActionHistory(1)}
            />
          </div>
        </div>

        <div className="flex">
          <FilterRefinerGroups style={{ maxHeight: 'calc(100vh - 146px)' }} />

          <SelectedGroup style={{ height: 'calc(100vh - 156px)' }} />

          <QuerySelected style={{ height: 'calc(100vh - 146px)' }} />
        </div>
      </ModalContent>
    </ModalView>
  )
})
