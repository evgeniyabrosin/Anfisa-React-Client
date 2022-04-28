import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { DtreeOperations } from '@core/enum/dtree-operations'
import { t } from '@i18n'
import { Button } from '@ui/button'
import modalsVisibilityStore from '../modals-visibility-store'
import { ModalBase } from './ui/modal-base'

const confirmationText = {
  dtreeDelete: t('dtree.dtreeDeleteConfirmation'),
}

export const ModalConfiramtion = observer((): ReactElement => {
  const handleApproveConfirmation = () => {
    if (modalsVisibilityStore.dtreeOperation === DtreeOperations.DeleteTree) {
      modalsVisibilityStore.deleteTree()
      modalsVisibilityStore.closeModalConfirmation()
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
          onClick={() => modalsVisibilityStore.closeModalConfirmation()}
        />
      </div>
    </ModalBase>
  )
})
