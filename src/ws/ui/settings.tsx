import { ReactElement } from 'react'
import styled from 'styled-components'

import { ExportTypeEnum } from '../../core/enum/export-type.enum'
import { useParams } from '../../core/hooks/use-params'
import datasetStore from '../../store/dataset'
import { Box } from '../../ui/box'
import { ExportReportButton } from '../../ui/export-report-button'
import { ColumnsControlSvg } from '../../ui/icons/columns-control'
import { ListView } from '../../ui/icons/list-view'

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
      <ColumnsControlSvg />

      <ListView />

      <ExportReportButton onClick={handleExport} />
    </Root>
  )
}
