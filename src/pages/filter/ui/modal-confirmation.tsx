import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { DtreeOperations } from '@core/enum/dtree-operations'
import { t } from '@i18n'
import { Button } from '@ui/button'
import dtreeModalStore from '../modals.store'
import { ModalBase } from './query-builder/ui/modal-base'

const confirmationText = {
  dtreeDelete: t('dtree.dtreeDeleteConfirmation'),
}

export const ModalConfiramtion = observer((): ReactElement => {
  const handleApproveConfirmation = () => {
    if (dtreeModalStore.dtreeOperation === DtreeOperations.DeleteTree) {
      dtreeModalStore.deleteTree()
      dtreeModalStore.closeModalConfirmation()
    }
  }
  return (
    <ModalBase minHeight={200} width="350px">
      <div className="flex justify-center mb-4">
        {DtreeOperations.DeleteTree && confirmationText.dtreeDelete}
      </div>

      <div className="flex justify-center">
        <Button
          text={'Yes'}
          className="mr-5"
          onClick={handleApproveConfirmation}
        />
        <Button
          text={'No'}
          variant="secondary"
          onClick={() => dtreeModalStore.closeModalConfirmation()}
        />
      </div>
    </ModalBase>
  )
})
