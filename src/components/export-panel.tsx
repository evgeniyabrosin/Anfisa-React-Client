import { ReactElement, useRef } from 'react'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import operationsStore from '@store/operations'
import { showToast } from '@utils/notifications/showToast'
import { MainTableDataCy } from './data-testid/main-table.cy'

interface Props {
  close: () => void
}

export const ExportPanel = ({ close }: Props): ReactElement => {
  const ref = useRef<any>(null)

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

  useOutsideClick(ref, close)

  return (
    <div
      className="bg-white text-black rounded shadow-card text-12 cursor-pointer flex flex-col w-32"
      ref={ref}
    >
      <span
        className="py-1 px-2 rounded hover:bg-blue-light"
        onClick={() => handleDownload(ExportTypeEnum.Excel)}
        data-testid={MainTableDataCy.exportExcel}
      >
        {t('general.excel')}
      </span>

      <span
        className="py-1 px-2 rounded hover:bg-blue-light"
        onClick={() => handleDownload(ExportTypeEnum.CSV)}
        data-testid={MainTableDataCy.exportCsv}
      >
        {t('general.csv')}
      </span>
    </div>
  )
}
