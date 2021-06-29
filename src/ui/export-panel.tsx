import { ReactElement } from 'react'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { t } from '@i18n'
import operationsStore from '@store/operations'

interface Props {
  close: () => void
}

export const ExportPanel = ({ close }: Props): ReactElement => {
  const handleDownload = (type: ExportTypeEnum) => {
    operationsStore.exportReportAsync(type)
    close()
  }

  return (
    <div className="bg-white text-black rounded mt-2 shadow-card text-12 cursor-pointer flex">
      <span
        className="py-1 px-3 rounded hover:bg-blue-light"
        onClick={() => handleDownload(ExportTypeEnum.Excel)}
      >
        {t('general.excel')}
      </span>

      <span
        className="py-1 px-3 rounded hover:bg-blue-light"
        onClick={() => handleDownload(ExportTypeEnum.CSV)}
      >
        {t('general.csv')}
      </span>
    </div>
  )
}
