import { ReactElement } from 'react'
import styled from 'styled-components'

import { ExportTypeEnum } from '../../core/enum/export-type.enum'
import { useParams } from '../../core/hooks/use-params'
import datasetStore from '../../store/dataset'
import { Box } from '../../ui/box'
import { ExportReportButton } from '../../ui/export-report-button'
import { Popper } from '../../ui/popper'
import { SettingsPanel } from './settings-panel'
import { TableProperiesButton } from './table-properties-button'

const Root = styled(Box)`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
`

export const Settings = (): ReactElement => {
  const params = useParams()

  const handleExport = () => {
    datasetStore.exportReportExcelAsync(params.get('ds'), ExportTypeEnum.Excel)
  }

  return (
    <Root>
      <Popper
        ButtonElement={TableProperiesButton}
        ModalElement={SettingsPanel}
      />

      <ExportReportButton onClick={handleExport} />
    </Root>
  )
}
