import { ReactElement } from 'react'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import {
  IPopperMenuProps,
  PopperMenu,
} from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { showToast } from '@utils/notifications/showToast'

export const ConditionModalOptionsPopup = ({
  close,
}: IPopperMenuProps): ReactElement => {
  const { selectedConditionIndex, conditions } = filterStore
  const filterName = conditions[selectedConditionIndex]?.[1] ?? ''

  const handleCopyFilterName = (e: React.MouseEvent) => {
    e.stopPropagation()

    copyToClipboard(filterName)

    showToast(t('ds.copied'), 'info')

    close()
  }

  const handleDeleteFilterBlock = (e: React.MouseEvent) => {
    e.stopPropagation()
    filterStore.removeCondition(selectedConditionIndex)
    close()
  }

  return (
    <PopperMenu close={close} className="w-32">
      <PopperMenuItem
        onClick={handleDeleteFilterBlock}
        data-testid={DecisionTreeModalDataCy.joinByAnd}
      >
        <div className="flex items-center justify-between">
          <span className="mr-2">{t('filter.delete')}</span>

          <Icon name="Delete" />
        </div>
      </PopperMenuItem>

      <PopperMenuItem
        onClick={handleCopyFilterName}
        data-testid={DecisionTreeModalDataCy.joinByOr}
      >
        <div className="flex items-center justify-between">
          <span className="mr-2">{t('filter.copy')}</span>

          <Icon name="Copy" className="text-grey-blue" />
        </div>
      </PopperMenuItem>
    </PopperMenu>
  )
}
