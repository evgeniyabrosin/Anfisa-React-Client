import { ReactElement, useRef } from 'react'
import cn from 'classnames'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { DtreeOperations } from '@core/enum/dtree-operations'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { showToast } from '@utils/notifications/showToast'
import dtreeModalStore from '../modals.store'
interface Props {
  close: () => void
}

const actions = [ActionFilterEnum.Modify, ActionFilterEnum.Delete]

export const DtreeModal = ({ close }: Props): ReactElement => {
  const ref = useRef(null)

  const handleClick = (action: ActionFilterEnum) => {
    let notification

    if (action === ActionFilterEnum.Delete) {
      if (dtreeStore.dtreeCode.length < 13) {
        notification = t('dtree.loadAnyDtree')
      }

      if (dtreeStore.currentDtreeName.startsWith('⏚')) {
        notification = t('dtree.cantDeleteModifyDefaultTree')
      }

      !notification &&
        dtreeModalStore.openModalConfirmation(DtreeOperations.DeleteTree)
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

    notification && showToast(notification, 'error')

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
          data-testid={DecisionTreesMenuDataCy.selectDropdownElem}
        >
          {action}
        </span>
      ))}
    </div>
  )
}
