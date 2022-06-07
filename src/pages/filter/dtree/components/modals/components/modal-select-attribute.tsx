import { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useScrollPosition } from '@core/hooks/use-scroll-position'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { DtreeUnitsList } from '@pages/filter/dtree/components/dtree-units-list'
import modalsVisibilityStore from '../modals-visibility-store'
import { HeaderModal } from './ui/header-modal'
import { ModalBase } from './ui/modal-base'

export const ModalSelectAttribute = observer((): ReactElement => {
  const { isLoading } = dtreeStore.stat

  const [readScrollPosition] = useScrollPosition({
    elem: '#attributes-container',
    storageId: 'attributesModalScrollPos',
  })

  const modalBaseRef = useRef(null)

  const handleClose = () => {
    modalsVisibilityStore.closeModalAttribute()
    dtreeStore.resetFilterModalValue()
  }

  useEffect(() => {
    readScrollPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalBase refer={modalBaseRef} minHeight="580px">
      <HeaderModal
        groupName={t('dtree.selectAttribute')}
        handleClose={handleClose}
      />
      {isLoading ? (
        <div className="flex flex-1 justify-center w-full my-4">
          {t('dtree.loading')}
        </div>
      ) : (
        <DtreeUnitsList
          isModal
          className="overflow-hidden -mx-4 flex-stretch-fill"
          listContainerId="attributes-container"
        />
      )}
    </ModalBase>
  )
})
