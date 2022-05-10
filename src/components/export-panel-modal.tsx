import { ReactElement } from 'react'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import operationsStore from '@store/operations'
import { showToast } from '@utils/notifications/showToast'
import { MainTableDataCy } from './data-testid/main-table.cy'
import { IPopperMenuProps, PopperMenu } from './popper-menu/popper-menu'
import { PopperMenuItem } from './popper-menu/popper-menu-item'

export const ExportPanelModal = ({ close }: IPopperMenuProps): ReactElement => {
  const { variantCounts } = datasetStore.fixedStatAmount

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
        data-testid={MainTableDataCy.exportExcel}
      >
        {t('general.excel')}
      </PopperMenuItem>

      <PopperMenuItem
        onClick={() => handleDownload(ExportTypeEnum.CSV)}
        data-testid={MainTableDataCy.exportCsv}
      >
        {t('general.csv')}
      </PopperMenuItem>
    </PopperMenu>
  )
}
