import { ReactElement, useRef } from 'react'
import { toast } from 'react-toastify'
import { toJS } from 'mobx'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import operationsStore from '@store/operations'
import { MainTableDataCy } from './data-testid/main-table.cy'

interface Props {
  close: () => void
}

export const ExportPanel = ({ close }: Props): ReactElement => {
  const ref = useRef<any>(null)

  const dataSetStatAmount = toJS(datasetStore.statAmount)

  const variantsAmount = dataSetStatAmount[0]

  const handleDownload = (type: ExportTypeEnum) => {
    if (typeof variantsAmount === 'number' && variantsAmount > 300) {
      toast.error(t('ds.tooMuchVariants'), {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      })
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
      >
        {t('general.csv')}
      </span>
    </div>
  )
}
