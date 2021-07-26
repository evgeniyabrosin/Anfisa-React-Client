import { ReactElement, useRef } from 'react'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import operationsStore from '@store/operations'

interface Props {
  close: () => void
}

export const ExportPanel = ({ close }: Props): ReactElement => {
  const ref = useRef<any>(null)

  const handleDownload = (type: ExportTypeEnum) => {
    operationsStore.exportReportAsync(type)
    close()
  }

  useOutsideClick(ref, close)

  return (
    <div
      className="bg-white text-black rounded shadow-card text-12 cursor-pointer flex"
      ref={ref}
    >
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
