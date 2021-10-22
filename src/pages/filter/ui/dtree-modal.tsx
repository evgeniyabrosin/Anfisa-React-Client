import { ReactElement, useRef } from 'react'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'

interface Props {
  close: () => void
}

const actions = [
  ActionFilterEnum.Load,
  ActionFilterEnum.Modify,
  ActionFilterEnum.Delete,
]

export const DtreeModal = ({ close }: Props): ReactElement => {
  const ref = useRef(null)

  const currentTreeName = dtreeStore.currentDtreeName
  const prevTreeName = dtreeStore.previousDtreeName

  const handleClick = (action: ActionFilterEnum) => {
    let notification

    if (action === ActionFilterEnum.Load) {
      if (!currentTreeName) {
        notification = t('dtree.chooseAnyTree')
      }

      if (
        dtreeStore.dtreeCode.length > 13 &&
        dtreeStore.startDtreeCode === dtreeStore.dtreeCode &&
        currentTreeName === prevTreeName
      ) {
        notification = t('dtree.noChanges')
      }

      if (!notification) {
        const body = new URLSearchParams({
          ds: datasetStore.datasetName,
          dtree: currentTreeName,
        })

        dtreeStore.fetchDtreeSetAsync(body)
      }
    }

    if (action === ActionFilterEnum.Delete) {
      if (dtreeStore.dtreeCode.length < 13) {
        notification = t('dtree.loadAnyDtree')
      }

      if (dtreeStore.currentDtreeName.startsWith('⏚')) {
        notification = t('dtree.cantDeleteModifyDefaultTree')
      }

      !notification && filterStore.setActionName(action)
    }

    if (action === ActionFilterEnum.Modify) {
      if (dtreeStore.dtreeCode.length < 13) {
        notification = t('dtree.loadAnyDtree')
      }

      if (dtreeStore.currentDtreeName.startsWith('⏚')) {
        notification = t('dtree.cantDeleteModifyDefaultTree')
      }

      if (dtreeStore.startDtreeCode === dtreeStore.dtreeCode) {
        notification = t('dtree.noChanges')
      }

      !notification && filterStore.setActionName(action)
    }

    notification &&
      toast.error(notification, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      })

    close()
  }

  useOutsideClick(ref, close)

  return (
    <div
      className="bg-white w-24 flex flex-col rounded text-12 leading-12px shadow-dark"
      ref={ref}
    >
      {actions.map((action, index) => (
        <span
          key={action}
          onClick={() => handleClick(action)}
          className={cn(
            'px-2 py-1 cursor-pointer hover:bg-blue-bright hover:text-white',
            { 'rounded-t': index === 0 },
            { 'rounded-b': index === actions.length - 1 },
          )}
        >
          {action}
        </span>
      ))}
    </div>
  )
}
