import { ReactElement } from 'react'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { t } from '@i18n'
import operationsStore from '@store/operations'
import mainTableStore from '@store/ws/main-table.store'
import { showToast } from '@utils/notifications/showToast'
import { MainTableDataCy } from './data-testid/main-table.cy'
import { IPopperMenuProps, PopperMenu } from './popper-menu/popper-menu'
import { PopperMenuItem } from './popper-menu/popper-menu-item'

export const ExportPanelModal = ({ close }: IPopperMenuProps): ReactElement => {
  const { variantCounts } = mainTableStore.fixedStatAmount

  const handleDownload = (type: ExportTypeEnum) => {
    if (typeof variantCounts === 'number' && variantCounts > 300) {
      showToast(t('ds.tooMuchVariants'), 'error')

      close()

      return
    }

    operationsStore.exportReportAsync(type)
    close()
  }

  return (
    <PopperMenu close={close} className="w-32">
      <PopperMenuItem
        onClick={() => handleDownload(ExportTypeEnum.Excel)}
        dataTestId={MainTableDataCy.exportExcel}
      >
        {t('general.excel')}
      </PopperMenuItem>

      <PopperMenuItem
        onClick={() => handleDownload(ExportTypeEnum.CSV)}
        dataTestId={MainTableDataCy.exportCsv}
      >
        {t('general.csv')}
      </PopperMenuItem>
    </PopperMenu>
  )
}
