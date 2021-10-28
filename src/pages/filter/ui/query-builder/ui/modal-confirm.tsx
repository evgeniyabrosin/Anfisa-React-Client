import { useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'

export const ModalConfirm = observer(() => {
  const ref = useRef(null)

  const handleClose = () => {
    //
  }

  return (
    <ModalBase refer={ref} minHeight={200} width="480px">
      <HeaderModal
        groupName={t('dtree.confirmClosing')}
        handleClose={handleClose}
      />

      <div className="flex w-full mt-4">{t('dtree.changesWontBeSaved')}</div>

      <div className="flex justify-end mt-4">
        <Button
          text={t('general.cancel')}
          hasBackground={false}
          className="text-black border-grey-light hover:bg-grey-light"
        />

        <Button
          text={t('general.closeWindow')}
          className="ml-2 text-black hover:bg-blue-bright hover:text-white"
          hasBackground={false}
        />
      </div>
    </ModalBase>
  )
})
