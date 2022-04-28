import { ReactElement, useRef } from 'react'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { showToast } from '@utils/notifications/showToast'

interface IConditionModalOptionsPopup {
  onClose: () => void
  onDeleteCondition: () => void
  filterName: string
}

export const ConditionModalOptionsPopup = ({
  onClose,
  onDeleteCondition,
  filterName,
}: IConditionModalOptionsPopup): ReactElement => {
  const ref = useRef(null)

  useOutsideClick(ref, () => onClose())

  const handleCopyFilterName = (e: React.MouseEvent) => {
    e.stopPropagation()

    copyToClipboard(filterName)

    showToast(t('ds.copied'), 'info')

    onClose()
  }

  const handleDeleteFilterBlock = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDeleteCondition()
  }

  return (
    <div ref={ref} className="top-4 right-6 absolute z-50 text-14 font-normal">
      <div className="top-8 flex flex-col justify-between px-0 py-0 bg-white rounded-md shadow-dark">
        <div
          onClick={handleDeleteFilterBlock}
          className="flex items-center justify-between py-2 px-2 rounded-br-none rounded-bl-none rounded-l-md rounded-r-md cursor-pointer hover:bg-blue-bright hover:text-white"
          data-testId={DecisionTreeModalDataCy.joinByAnd}
        >
          <div className="mr-2">{t('filter.delete')}</div>

          <Icon name="Delete" />
        </div>

        <div
          onClick={handleCopyFilterName}
          className="flex items-center justify-between py-2 px-2 rounded-bl-md rounded-br-md cursor-pointer hover:bg-blue-bright hover:text-white"
          data-testId={DecisionTreeModalDataCy.joinByOr}
        >
          <div>{t('filter.copy')}</div>

          <Icon name="Copy" className="text-grey-blue" />
        </div>
      </div>
    </div>
  )
}
